"use strict";
import compiler from './compiler';
import { TokenList, Token, Nodes, WASM, getLabelName } from './const';

function getWasmType(type) {
  switch (type) {
    case TokenList.VOID: return (WASM.TYPE_CTOR_VOID);
    case TokenList.INT: case TokenList.INT32: return (WASM.TYPE_CTOR_I32);
    case TokenList.INT64: return (WASM.TYPE_CTOR_I64);
    case TokenList.FLOAT: case TokenList.FLOAT32: return (WASM.TYPE_CTOR_I32);
    case TokenList.FLOAT64: return (WASM.TYPE_CTOR_F64);
    case TokenList.BOOL: return (WASM.TYPE_CTOR_I32);
  };
  return (-1);
};

function getNativeTypeSize(type) {
  switch (type) {
    case TokenList.INT: case TokenList.INT32: return (4);
    case TokenList.INT64: return (8);
    case TokenList.FLOAT: case TokenList.FLOAT32: return (4);
    case TokenList.FLOAT64: return (8);
  };
  return (-1);
};

function getWasmOperator(op) {
  switch (op) {
    case "+": return (WASM.OPCODE_I32_ADD);
    case "-": return (WASM.OPCODE_I32_SUB);
    case "*": return (WASM.OPCODE_I32_MUL);
    case "/": return (WASM.OPCODE_I32_DIV_S);
    case "%": return (WASM.OPCODE_I32_REM_S);
    case "<": return (WASM.OPCODE_I32_LT_S);
    case "<=": return (WASM.OPCODE_I32_LE_S);
    case ">": return (WASM.OPCODE_I32_GT_S);
    case ">=": return (WASM.OPCODE_I32_GE_S);
    case "==": return (WASM.OPCODE_I32_EQ);
    case "!=": return (WASM.OPCODE_I32_NEQ);
    case "&&": return (WASM.OPCODE_I32_AND);
    case "||": return (WASM.OPCODE_I32_OR);
  };
  return (-1);
};

/**
 * 1. Type section    -> function signatures
 * 2. Func section    -> function signature indices
 * 4. Table section   -> function indirect call indices
 * 5. Memory section  -> memory sizing
 * 6. Global section  -> global variables
 * 7. Export section  -> function exports
 * 8. Element section -> table section elements
 * 8. Code section    -> function bodys
 */
export function emit(node) {
  compiler.scope = node.context;
  compiler.bytes.emitU32(WASM.MAGIC);
  compiler.bytes.emitU32(WASM.VERSION);
  emitTypeSection(node.body);
  emitFunctionSection(node.body);
  emitTableSection(node.body);
  emitMemorySection(node);
  emitGlobalSection(node.body);
  emitExportSection(node.body);
  emitElementSection(node.body);
  emitCodeSection(node.body);
};

function emitElementSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_ELEMENT);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map((child) => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      // link to anyfunc table
      compiler.bytes.writeVarUnsigned(0);
      compiler.bytes.emitUi32(child.index);
      compiler.bytes.emitU8(WASM.OPCODE_END);
      compiler.bytes.writeVarUnsigned(1);
      compiler.bytes.writeVarUnsigned(child.index);
      amount++;
    }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
};

function emitTableSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_TABLE);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 1;
  // mvp only allows <= 1
  emitFunctionTable(node);
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
};

function emitFunctionTable(node) {
  // type
  compiler.bytes.emitU8(WASM.TYPE_CTOR_ANYFUNC);
  // flags
  compiler.bytes.emitU8(1);
  let count = 0;
  node.body.map((child) => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      count++;
    }
  });
  // initial
  compiler.bytes.writeVarUnsigned(count);
  // max
  compiler.bytes.writeVarUnsigned(count);
};

function emitGlobalSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_GLOBAL);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map((child) => {
    if (child.kind === Nodes.VariableDeclaration && child.isGlobal) {
      let init = child.init.right;
      // globals have their own indices, patch it here
      child.index = amount++;
      compiler.bytes.emitU8(getWasmType(child.type));
      // mutability, enabled by default
      compiler.bytes.emitU8(1);
      emitNode(init);
      compiler.bytes.emitU8(WASM.OPCODE_END);
    }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
};

function emitTypeSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_TYPE);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map((child) => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      compiler.bytes.emitU8(WASM.TYPE_CTOR_FUNC);
      // parameter count
      compiler.bytes.writeVarUnsigned(child.parameter.length);
      // parameter types
      child.parameter.map((param) => {
        compiler.bytes.emitU8(getWasmType(param.type));
      });
      // emit type
      if (child.type !== TokenList.VOID) {
        // return count, max 1 in MVP
        compiler.bytes.emitU8(1);
        // return type
        compiler.bytes.emitU8(getWasmType(child.type));
      // void
      } else {
        compiler.bytes.emitU8(0);
      }
      child.index = amount;
      amount++;
    }
  });
  count.patch(amount);
  // emit section size at reserved patch offset
  size.patch(compiler.bytes.length - size.offset);
};

function emitFunctionSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_FUNCTION);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map((child) => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      amount++;
      compiler.bytes.writeVarUnsigned(child.index);
    }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
};

function emitMemorySection(node) {
  compiler.bytes.emitU8(WASM.SECTION_MEMORY);
  // we dont use memory yet, write empty bytes
  let size = compiler.bytes.createU32vPatch();
  compiler.bytes.emitU32v(1);
  compiler.bytes.emitU32v(0);
  compiler.bytes.emitU32v(1);
  size.patch(compiler.bytes.length - size.offset);
};

function emitExportSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_EXPORT);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  // export functions
  node.body.map((child) => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      if (child.isExported || child.id === "main") {
        amount++;
        compiler.bytes.emitString(child.id);
        compiler.bytes.emitU8(WASM.EXTERN_FUNCTION);
        compiler.bytes.writeVarUnsigned(child.index);
      }
    }
  });
  // export memory
  (() => {
    amount++;
    compiler.bytes.emitString("memory");
    compiler.bytes.emitU8(WASM.EXTERN_MEMORY);
    compiler.bytes.emitU8(0);
  })();
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
};

function emitCodeSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_CODE);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map((child) => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      emitFunction(child);
      amount++;
    }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
};

function growHeap(amount) {
  compiler.currentHeapOffset += amount;
};

function emitNode(node) {
  let kind = node.kind;
  if (kind === Nodes.BlockStatement) {
    let actual = node.context.node;
    // if, while auto provide a block scope
    let skip = (
      actual.kind === Nodes.IfStatement ||
      actual.kind === Nodes.WhileStatement ||
      actual.kind === Nodes.FunctionDeclaration
    );
    if (skip) {
      //console.log("Skipping block code for", Nodes[actual.kind]);
    }
    if (node.context) {
      compiler.scope = node.context;
    }
    if (!skip) {
      compiler.bytes.emitU8(WASM.OPCODE_BLOCK);
      compiler.bytes.emitU8(WASM.TYPE_CTOR_BLOCK);
    }
    node.body.map((child) => {
      emitNode(child);
    });
    if (!skip) {
      compiler.bytes.emitU8(WASM.OPCODE_END);
    }
    if (node.context) {
      compiler.scope = compiler.scope.parent;
    }
  } else if (kind === Nodes.IfStatement) {
    if (node.condition) {
      emitNode(node.condition);
      compiler.bytes.emitU8(WASM.OPCODE_IF);
      compiler.bytes.emitU8(WASM.TYPE_CTOR_BLOCK);
    }
    emitNode(node.consequent);
    if (node.alternate) {
      compiler.bytes.emitU8(WASM.OPCODE_ELSE);
      emitNode(node.alternate);
    }
    if (node.condition)
      compiler.bytes.emitU8(WASM.OPCODE_END);
  } else if (kind === Nodes.ReturnStatement) {
    if (node.argument) emitNode(node.argument);
    compiler.bytes.emitU8(WASM.OPCODE_RETURN);
  } else if (kind === Nodes.CallExpression) {
    let callee = node.callee.value;
    let resolve = compiler.scope.resolve(callee);
    node.parameter.map((child) => {
      emitNode(child);
    });
    if (resolve.isPointer) {
      compiler.bytes.emitUi32(resolve.offset);
      compiler.bytes.emitLoad32();
      compiler.bytes.emitU8(WASM.OPCODE_CALL_INDIRECT);
      compiler.bytes.writeVarUnsigned(resolve.offset);
      compiler.bytes.emitU8(0);
    } else {
      compiler.bytes.emitU8(WASM.OPCODE_CALL);
      compiler.bytes.writeVarUnsigned(resolve.index);
    }
  } else if (kind === Nodes.VariableDeclaration) {
    emitVariableDeclaration(node);
  } else if (kind === Nodes.WhileStatement) {
    compiler.bytes.emitU8(WASM.OPCODE_BLOCK);
    compiler.bytes.emitU8(WASM.TYPE_CTOR_BLOCK);
    compiler.bytes.emitU8(WASM.OPCODE_LOOP);
    compiler.bytes.emitU8(WASM.TYPE_CTOR_BLOCK);
    // condition
    emitNode(node.condition);
    // break if condition != true
    compiler.bytes.emitU8(WASM.OPCODE_I32_EQZ);
    compiler.bytes.emitU8(WASM.OPCODE_BR_IF);
    compiler.bytes.emitU8(1);
    emitNode(node.body);
    // jump back to top
    compiler.bytes.emitU8(WASM.OPCODE_BR);
    compiler.bytes.emitU8(0);
    compiler.bytes.emitU8(WASM.OPCODE_UNREACHABLE);
    compiler.bytes.emitU8(WASM.OPCODE_END);
    compiler.bytes.emitU8(WASM.OPCODE_END);
  } else if (kind === Nodes.BreakStatement) {
    compiler.bytes.emitU8(WASM.OPCODE_BR);
    let label = getLoopDepthIndex();
    compiler.bytes.writeVarUnsigned(label);
    compiler.bytes.emitU8(WASM.OPCODE_UNREACHABLE);
  } else if (kind === Nodes.ContinueStatement) {
    compiler.bytes.emitU8(WASM.OPCODE_BR);
    let label = getLoopDepthIndex();
    compiler.bytes.writeVarUnsigned(label - 1);
    compiler.bytes.emitU8(WASM.OPCODE_UNREACHABLE);
  } else if (kind === Nodes.Literal) {
    if (node.type === Token.Identifier) {
      emitIdentifier(node);
    } else if (node.type === Token.NumericLiteral || node.type === Token.HexadecimalLiteral) {
      compiler.bytes.emitU8(WASM.OPCODE_I32_CONST);
      compiler.bytes.emitLEB128(parseInt(node.value));
    } else {
      compiler.__imports.error("Unknown literal type " + node.type);
    }
  } else if (kind === Nodes.UnaryPrefixExpression) {
    let operator = node.operator;
    // 0 - x
    if (operator === "-") {
      compiler.bytes.emitUi32(0);
      emitNode(node.value);
      compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
    } else if (operator === "+") {
      // ignored
      emitNode(node.value);
    } else if (operator === "!") {
      // x = 0
      emitNode(node.value);
      compiler.bytes.emitU8(WASM.OPCODE_I32_EQZ);
    } else if (operator === "++" || operator === "--") {
      let local = node.value;
      let resolve = compiler.scope.resolve(local.value);
      let op = (
        node.operator === "++" ? WASM.OPCODE_I32_ADD : WASM.OPCODE_I32_SUB
      );
      compiler.bytes.emitUi32(resolve.offset);
      emitNode(local);
      compiler.bytes.emitUi32(1);
      compiler.bytes.emitU8(op);
      // store it
      compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
      // i32
      compiler.bytes.emitU8(2);
      compiler.bytes.emitU8(0);
      compiler.bytes.emitUi32(resolve.offset);
      // tee_local with load
      compiler.bytes.emitLoad32();
    } else if (operator === "&") {
      emitReference(node);
    } else if (operator === "*") {
      emitDereference(node);
    }
  } else if (kind === Nodes.UnaryPostfixExpression) {
    emitPostfixExpression(node);
  } else if (kind === Nodes.BinaryExpression) {
    let operator = node.operator;
    if (operator === "=") {
      emitAssignment(node);
    } else {
      emitNode(node.left);
      emitNode(node.right);
      compiler.bytes.emitU8(getWasmOperator(operator));
    }
  } else {
    compiler.__imports.error("Unknown node kind " + kind);
  }
};

// expect var|&
function resolveLValue(node) {
  if (node.kind === Nodes.UnaryPrefixExpression) {
    return (resolveLValue(node.value));
  }
  return (node);
};

// lvalue á &var &(var)
function emitReference(node) {
  let lvalue = resolveLValue(node);
  let resolve = compiler.scope.resolve(lvalue.value);
  // &ptr?
  if (resolve.isPointer) {
    let value = node.value;
    // &ptr
    if (value.type === Token.Identifier) {
      compiler.bytes.emitUi32(resolve.offset);
    } else if (value.operator === "*") {
      // &*ptr
      emitNode(lvalue);
    } else {
      compiler.__imports.log("Unsupported adress-of value", getLabelName(value.kind));
    }
  } else if (resolve.kind === Nodes.FunctionDeclaration) {
    // &func == func
    compiler.bytes.emitUi32(resolve.index);
  } else if (resolve.isAlias) {
    // emit the reference's &(init)
    emitNode(resolve.aliasReference);
  } else {
    // default variable, emit it's address
    compiler.bytes.emitUi32(resolve.offset);
  }
};

// *var *(*expr)
function emitDereference(node) {
  emitNode(node.value);
  compiler.bytes.emitLoad32();
};

// *ptr = node
function emitPointerAssignment(node) {
  emitNode(node.left.value);
  // push the adress to assign
  emitNode(node.right);
  // store it
  compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
  // i32
  compiler.bytes.emitU8(2);
  compiler.bytes.emitU8(0);
};

function emitAssignment(node) {
  let target = node.left;
  // special case, pointer assignment
  if (node.left.operator === "*") {
    emitPointerAssignment(node);
    return;
  }
  let resolve = compiler.scope.resolve(node.left.value);
  // deep assignment
  if (node.right.operator === "=") {
    emitNode(node.right);
    emitNode(node.right.left);
  } else if (resolve.isGlobal) {
    // global variable
    emitNode(node.right);
    compiler.bytes.emitU8(WASM.OPCODE_SET_GLOBAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  }  else if (resolve.isAlias) {
    // assign to alias variable
    // *ptr | b
    // =
    // node
    emitNode({
      kind: Nodes.BinaryExpression,
      operator: "=",
      left: resolve.aliasValue,
      right: node.right
    });
  } else if (resolve.isParameter && !resolve.isPointer) {
    // assign to default parameter
    emitNode(node.right);
    compiler.bytes.emitU8(WASM.OPCODE_SET_LOCAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  } else {
    // assign to default variable
    if (insideVariableDeclaration) {
      emitNode(node.right);
    } else {
      compiler.bytes.emitUi32(resolve.offset);
      emitNode(node.right);
      compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
      // i32
      compiler.bytes.emitU8(2);
      compiler.bytes.writeVarUnsigned(0);
    }
  }
};

function emitIdentifier(node) {
  let resolve = compiler.scope.resolve(node.value);
  // global variable
  if (resolve.isGlobal) {
    compiler.bytes.emitU8(WASM.OPCODE_GET_GLOBAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  } else if (resolve.isParameter) {
    // we only have access to the passed in value
    compiler.bytes.emitU8(WASM.OPCODE_GET_LOCAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  } else if (resolve.isPointer) {
    // pointer variable
    // push the pointer's pointed to address
    compiler.bytes.emitUi32(resolve.offset);
    compiler.bytes.emitLoad32();
  } else if (resolve.isAlias) {
    // just a shortcut to the assigned value
    emitNode(resolve.aliasValue);
  } else if (resolve.kind === Nodes.FunctionDeclaration) {
    // return the function's address
    compiler.bytes.emitUi32(resolve.index);
  } else if (resolve.kind === Nodes.VariableDeclaration) {
    // default variable
    // variables are stored in memory too
    compiler.bytes.emitUi32(resolve.offset);
    compiler.bytes.emitLoad32();
  } else {
    compiler.__imports.error("Unknown identifier kind", getLabelName(resolve.kind));
  }
};

let insideVariableDeclaration = false;
function emitVariableDeclaration(node) {
  let resolve = compiler.scope.resolve(node.id);
  node.offset = compiler.currentHeapOffset;
  // store pointer
  if (resolve.isPointer) {
    compiler.__imports.log("Store variable", node.id, "in memory at", resolve.offset);
    // # store the pointed adress
    // offset
    compiler.bytes.emitUi32(resolve.offset);
    growHeap(4);
    // value
    insideVariableDeclaration = true;
    emitNode(node.init);
    insideVariableDeclaration = false;
    // store
    compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
     // i32
    compiler.bytes.emitU8(2);
    compiler.bytes.emitU8(0);
  } else if (resolve.isAlias) {
    // store alias
    compiler.__imports.log("Store alias", node.id, "in memory at", resolve.offset);
    // offset
    compiler.bytes.emitUi32(resolve.offset);
    growHeap(4);
    // alias = &(init)
    emitNode(node.aliasReference);
    // store
    compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
    // i32
    compiler.bytes.emitU8(2);
    compiler.bytes.emitU8(0);
  } else {
    // store variable
    compiler.__imports.log("Store variable", node.id, "in memory at", resolve.offset);
    // offset
    compiler.bytes.emitUi32(resolve.offset);
    growHeap(4);
    // value
    insideVariableDeclaration = true;
    emitNode(node.init);
    insideVariableDeclaration = false;
    // store
    compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
    // i32
    compiler.bytes.emitU8(2);
    compiler.bytes.emitU8(0);
  }
};

function getLoopDepthIndex() {
  let ctx = compiler.scope;
  let label = 0;
  while (ctx !== null) {
    label++;
    if (ctx.node.kind === Nodes.WhileStatement) break;
    ctx = ctx.parent;
  };
  return (label);
};

function emitPostfixExpression(node) {
  let local = node.value;
  let resolve = compiler.scope.resolve(local.value);
  if (node.operator === "++") {
    // store offset
    compiler.bytes.emitUi32(resolve.offset);
    // value to store
    compiler.bytes.emitUi32(1);
    emitIdentifier(local);
    compiler.bytes.emitU8(WASM.OPCODE_I32_ADD);
    // pop store
    compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
    // i32
    compiler.bytes.emitU8(2);
    compiler.bytes.emitU8(0);
    compiler.bytes.emitUi32(resolve.offset);
    // tee_local with load
    compiler.bytes.emitLoad32();
    compiler.bytes.emitUi32(1);
    compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
  } else if (node.operator === "--") {
    // store offset
    compiler.bytes.emitUi32(resolve.offset);
    emitIdentifier(local);
    compiler.bytes.emitUi32(1);
    compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
    // pop store
    compiler.bytes.emitU8(WASM.OPCODE_I32_STORE);
    // i32
    compiler.bytes.emitU8(2);
    compiler.bytes.emitU8(0);
    compiler.bytes.emitUi32(resolve.offset);
    // tee_local with load
    compiler.bytes.emitLoad32();
    compiler.bytes.emitUi32(1);
    compiler.bytes.emitU8(WASM.OPCODE_I32_ADD);
  }
};

function emitFunction(node) {
  let size = compiler.bytes.createU32vPatch();
  // emit count of locals
  let locals = node.locals;
  // local count
  compiler.bytes.writeVarUnsigned(locals.length);
  // local entry signatures
  locals.map((local) => {
    compiler.bytes.emitU8(1);
    compiler.bytes.emitU8(getWasmType(local.type));
  });
  emitNode(node.body);
  // patch function body size
  compiler.bytes.emitU8(WASM.OPCODE_END);
  size.patch(compiler.bytes.length - size.offset);
};

function getLocalSignatureUniforms(locals) {
  let uniforms = [];
  return (uniforms);
};

function getFunctionSignatureUniforms(fns) {
  let uniforms = [];
  return (uniforms);
};
