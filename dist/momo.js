(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.momo = factory());
}(this, (function () { 'use strict';

/** # Label generation # */

let ii = 0;

let Nodes = {};
let Token = {};
let TokenList = {};
let Operators = {};

/** Types */
(Label => {
  Label[Label["Program"] = ++ii] = "Program";
  Label[Label["BinaryExpression"] = ++ii] = "BinaryExpression";
  Label[Label["UnaryExpression"] = ++ii] = "UnaryExpression";
  Label[Label["UnaryPrefixExpression"] = ++ii] = "UnaryPrefixExpression";
  Label[Label["UnaryPostfixExpression"] = ++ii] = "UnaryPostfixExpression";
  Label[Label["CallExpression"] = ++ii] = "CallExpression";
  Label[Label["CastExpression"] = ++ii] = "CastExpression";
  Label[Label["ParameterExpression"] = ++ii] = "ParameterExpression";
  Label[Label["BlockStatement"] = ++ii] = "BlockStatement";
  Label[Label["ReturnStatement"] = ++ii] = "ReturnStatement";
  Label[Label["IfStatement"] = ++ii] = "IfStatement";
  Label[Label["ForStatement"] = ++ii] = "ForStatement";
  Label[Label["WhileStatement"] = ++ii] = "WhileStatement";
  Label[Label["ExpressionStatement"] = ++ii] = "ExpressionStatement";
  Label[Label["ImportStatement"] = ++ii] = "ImportStatement";
  Label[Label["ExportStatement"] = ++ii] = "ExportStatement";
  Label[Label["BreakStatement"] = ++ii] = "BreakStatement";
  Label[Label["ContinueStatement"] = ++ii] = "ContinueStatement";
  Label[Label["FunctionExpression"] = ++ii] = "FunctionExpression";
  Label[Label["FunctionDeclaration"] = ++ii] = "FunctionDeclaration";
  Label[Label["VariableDeclaration"] = ++ii] = "VariableDeclaration";
  Label[Label["EnumDeclaration"] = ++ii] = "EnumDeclaration";
  Label[Label["Parameter"] = ++ii] = "Parameter";
  Label[Label["Enumerator"] = ++ii] = "Enumerator";
  Label[Label["Identifier"] = ++ii] = "Identifier";
  Label[Label["Literal"] = ++ii] = "Literal";
  Label[Label["Comment"] = ++ii] = "Comment";
})(Nodes);

/** Data types */
(Label => {
  Label[Label["EOF"] = ++ii] = "EOF";
  Label[Label["Unknown"] = ++ii] = "Unknown";
  Label[Label["Keyword"] = ++ii] = "Keyword";
  Label[Label["Identifier"] = ++ii] = "Identifier";
  Label[Label["BooleanLiteral"] = ++ii] = "BooleanLiteral";
  Label[Label["NullLiteral"] = ++ii] = "NullLiteral";
  Label[Label["StringLiteral"] = ++ii] = "StringLiteral";
  Label[Label["NumericLiteral"] = ++ii] = "NumericLiteral";
  Label[Label["HexadecimalLiteral"] = ++ii] = "HexadecimalLiteral";
})(Token);

/** Tokens */
(Label => {
  /** Punctuators */
  Label[Label["("] = ++ii] = "LPAREN";
  Label[Label[")"] = ++ii] = "RPAREN";
  Label[Label["{"] = ++ii] = "LBRACE";
  Label[Label["}"] = ++ii] = "RBRACE";
  Label[Label[","] = ++ii] = "COMMA";
  Label[Label[";"] = ++ii] = "SEMICOLON";
  /** Literals */
  Label[Label["true"] = ++ii] = "TRUE";
  Label[Label["false"] = ++ii] = "FALSE";
  /** Declaration keywords */
  Label[Label["enum"] = ++ii] = "ENUM";
  Label[Label["import"] = ++ii] = "IMPORT";
  Label[Label["extern"] = ++ii] = "EXPORT";
  /** Statement keywords */
  Label[Label["break"] = ++ii] = "BREAK";
  Label[Label["continue"] = ++ii] = "CONTINUE";
  Label[Label["do"] = ++ii] = "DO";
  Label[Label["else"] = ++ii] = "ELSE";
  Label[Label["for"] = ++ii] = "FOR";
  Label[Label["if"] = ++ii] = "IF";
  Label[Label["return"] = ++ii] = "RETURN";
  Label[Label["while"] = ++ii] = "WHILE";
  /** Types */
  Label[Label["int"] = ++ii] = "INT";
  Label[Label["i32"] = ++ii] = "INT32";
  Label[Label["i64"] = ++ii] = "INT64";
  Label[Label["float"] = ++ii] = "FLOAT";
  Label[Label["f32"] = ++ii] = "FLOAT32";
  Label[Label["f64"] = ++ii] = "FLOAT64";
  Label[Label["void"] = ++ii] = "VOID";
  Label[Label["bool"] = ++ii] = "BOOLEAN";
})(TokenList);

/** Operators */
(Label => {
  Label.LOWEST = ++ii;
  Label.UNARY_POSTFIX = ++ii;
  // order by precedence
  Label[Label["="] = ++ii] = "ASS";
  Label[Label["+="] = ++ii] = "ADD_ASS";
  Label[Label["-="] = ++ii] = "SUB_ASS";
  Label[Label["*="] = ++ii] = "MUL_ASS";
  Label[Label["/="] = ++ii] = "DIV_ASS";
  Label[Label["%="] = ++ii] = "MOD_ASS";

  Label[Label["&="] = ++ii] = "BIN_AND_ASS";
  Label[Label["|="] = ++ii] = "BIN_OR_ASS";
  Label[Label["^="] = ++ii] = "BIN_XOR_ASS";
  Label[Label["<<="] = ++ii] = "BIN_SHL_ASS";
  Label[Label[">>="] = ++ii] = "BIN_SHR_ASS";

  Label[Label["||"] = ++ii] = "OR";
  Label[Label["&&"] = ++ii] = "AND";
  Label[Label["=="] = ++ii] = "EQ";
  Label[Label["!="] = ++ii] = "NEQ";
  Label[Label["<"] = ++ii] = "LT";
  Label[Label["<="] = ++ii] = "LE";
  Label[Label[">"] = ++ii] = "GT";
  Label[Label[">="] = ++ii] = "GE";
  Label[Label["+"] = ++ii] = "ADD";
  Label[Label["-"] = ++ii] = "SUB";
  Label[Label["*"] = ++ii] = "MUL";
  Label[Label["/"] = ++ii] = "DIV";
  Label[Label["%"] = ++ii] = "MOD";

  Label[Label["&"] = ++ii] = "BIN_AND";
  Label[Label["|"] = ++ii] = "BIN_OR";
  Label[Label["~"] = ++ii] = "BIN_NOT";
  Label[Label["^"] = ++ii] = "BIN_XOR";
  Label[Label["<<"] = ++ii] = "BIN_SHL";
  Label[Label[">>"] = ++ii] = "BIN_SHR";

  Label[Label["!"] = ++ii] = "NOT";
  Label[Label["--"] = ++ii] = "DECR";
  Label[Label["++"] = ++ii] = "INCR";
  Label.UNARY_PREFIX = ++ii;
  Label.HIGHEST = ++ii;
})(Operators);

function getLabelName(index) {
  index = index | 0;
  if (Nodes[index] !== void 0) return Nodes[index];
  if (Token[index] !== void 0) return Token[index];
  if (TokenList[index] !== void 0) return TokenList[index];
  if (Operators[index] !== void 0) return Operators[index];
  return "undefined";
}

/**
 * Auto generate
 * str access key
 * for token list
 */
(() => {
  const items = [Nodes, Token, TokenList, Operators];
  items.map(item => {
    for (let key in item) {
      const code = parseInt(key);
      if (!(code >= 0)) continue;
      const nkey = item[key].toUpperCase();
      item[nkey] = code;
    }
  });
})();

// # Wasm codes

// control flow operators
const WASM = {
  OPCODE_UNREACHABLE: 0x00,
  OPCODE_NOP: 0x01,
  OPCODE_BLOCK: 0x02,
  OPCODE_LOOP: 0x03,
  OPCODE_IF: 0x04,
  OPCODE_ELSE: 0x05,
  OPCODE_END: 0x0b,
  OPCODE_BR: 0x0c,
  OPCODE_BR_IF: 0x0d,
  OPCODE_BR_TABLE: 0x0e,
  OPCODE_RETURN: 0x0f,
  // call operators
  OPCODE_CALL: 0x10,
  OPCODE_CALL_INDIRECT: 0x11,
  // parametric operators
  OPCODE_DROP: 0x1a,
  OPCODE_SELECT: 0x1b,
  // variable access
  OPCODE_GET_LOCAL: 0x20,
  OPCODE_SET_LOCAL: 0x21,
  OPCODE_TEE_LOCAL: 0x22,
  OPCODE_GET_GLOBAL: 0x23,
  OPCODE_SET_GLOBAL: 0x24,
  // memory operators
  OPCODE_I32_LOAD: 0x28,
  OPCODE_I64_LOAD: 0x29,
  OPCODE_F32_LOAD: 0x2a,
  OPCODE_F64_LOAD: 0x2b,
  OPCODE_I32_LOAD8_S: 0x2c,
  OPCODE_I32_LOAD8_U: 0x2d,
  OPCODE_I32_LOAD16_S: 0x2e,
  OPCODE_I32_LOAD16_U: 0x2f,
  OPCODE_I64_LOAD8_S: 0x30,
  OPCODE_I64_LOAD8_U: 0x31,
  OPCODE_I64_LOAD16_S: 0x32,
  OPCODE_I64_LOAD16_U: 0x33,
  OPCODE_I64_LOAD32_S: 0x34,
  OPCODE_I64_LOAD32_U: 0x35,
  OPCODE_I32_STORE: 0x36,
  OPCODE_I64_STORE: 0x37,
  OPCODE_F32_STORE: 0x38,
  OPCODE_F64_STORE: 0x39,
  OPCODE_I32_STORE8: 0x3a,
  OPCODE_I32_STORE16: 0x3b,
  OPCODE_I64_STORE8: 0x3c,
  OPCODE_I64_STORE16: 0x3d,
  OPCODE_I64_STORE32: 0x3e,
  OPCODE_CURRENT_MEMORY: 0x3f,
  OPCODE_GROW_MEMORY: 0x40,
  // constants
  OPCODE_I32_CONST: 0x41,
  OPCODE_I64_CONST: 0x42,
  OPCODE_F32_CONST: 0x43,
  OPCODE_F64_CONST: 0x44,
  // comparison operators
  OPCODE_I32_EQZ: 0x45,
  OPCODE_I32_EQ: 0x46,
  OPCODE_I32_NEQ: 0x47,
  OPCODE_I32_LT_S: 0x48,
  OPCODE_I32_LT_U: 0x49,
  OPCODE_I32_GT_S: 0x4a,
  OPCODE_I32_GT_U: 0x4b,
  OPCODE_I32_LE_S: 0x4c,
  OPCODE_I32_LE_U: 0x4d,
  OPCODE_I32_GE_S: 0x4e,
  OPCODE_I32_GE_U: 0x4f,
  OPCODE_I64_EQZ: 0x50,
  OPCODE_I64_EQ: 0x51,
  OPCODE_I64_NE: 0x52,
  OPCODE_I64_LT_S: 0x53,
  OPCODE_I64_LT_U: 0x54,
  OPCODE_I64_GT_S: 0x55,
  OPCODE_I64_GT_U: 0x56,
  OPCODE_I64_LE_S: 0x57,
  OPCODE_I64_LE_U: 0x58,
  OPCODE_I64_GE_S: 0x59,
  OPCODE_I64_GE_U: 0x5a,
  OPCODE_F32_EQ: 0x5b,
  OPCODE_F32_NE: 0x5c,
  OPCODE_F32_LT: 0x5d,
  OPCODE_F32_GT: 0x5e,
  OPCODE_F32_LE: 0x5f,
  OPCODE_F32_GE: 0x60,
  OPCODE_F64_EQ: 0x61,
  OPCODE_F64_NE: 0x62,
  OPCODE_F64_LT: 0x63,
  OPCODE_F64_GT: 0x64,
  OPCODE_F64_LE: 0x65,
  OPCODE_F64_GE: 0x66,
  // numeric operators
  OPCODE_I32_CLZ: 0x67,
  OPCODE_I32_CTZ: 0x68,
  OPCODE_I32_POPCNT: 0x69,
  OPCODE_I32_ADD: 0x6a,
  OPCODE_I32_SUB: 0x6b,
  OPCODE_I32_MUL: 0x6c,
  OPCODE_I32_DIV_S: 0x6d,
  OPCODE_I32_DIV_U: 0x6e,
  OPCODE_I32_REM_S: 0x6f,
  OPCODE_I32_REM_U: 0x70,
  OPCODE_I32_AND: 0x71,
  OPCODE_I32_OR: 0x72,
  OPCODE_I32_XOR: 0x73,
  OPCODE_I32_SHL: 0x74,
  OPCODE_I32_SHR_S: 0x75,
  OPCODE_I32_SHR_U: 0x76,
  OPCODE_I32_ROTL: 0x77,
  OPCODE_I32_ROTR: 0x78,
  OPCODE_I64_CLZ: 0x79,
  OPCODE_I64_CTZ: 0x7a,
  OPCODE_I64_POPCNT: 0x7b,
  OPCODE_I64_ADD: 0x7c,
  OPCODE_I64_SUB: 0x7d,
  OPCODE_I64_MUL: 0x7e,
  OPCODE_I64_DIV_S: 0x7f,
  OPCODE_I64_DIV_U: 0x80,
  OPCODE_I64_REM_S: 0x81,
  OPCODE_I64_REM_U: 0x82,
  OPCODE_I64_AND: 0x83,
  OPCODE_I64_OR: 0x84,
  OPCODE_I64_XOR: 0x85,
  OPCODE_I64_SHL: 0x86,
  OPCODE_I64_SHR_S: 0x87,
  OPCODE_I64_SHR_U: 0x88,
  OPCODE_I64_ROTL: 0x89,
  OPCODE_I64_ROTR: 0x8a,
  OPCODE_F32_ABS: 0x8b,
  OPCODE_F32_NEG: 0x8c,
  OPCODE_F32_CEIL: 0x8d,
  OPCODE_F32_FLOOR: 0x8e,
  OPCODE_F32_TRUNC: 0x8f,
  OPCODE_F32_NEAREST: 0x90,
  OPCODE_F32_SQRT: 0x91,
  OPCODE_F32_ADD: 0x92,
  OPCODE_F32_SUB: 0x93,
  OPCODE_F32_MUL: 0x94,
  OPCODE_F32_DIV: 0x95,
  OPCODE_F32_MIN: 0x96,
  OPCODE_F32_MAX: 0x97,
  OPCODE_F32_COPYSIGN: 0x98,
  OPCODE_F64_ABS: 0x99,
  OPCODE_F64_NEG: 0x9a,
  OPCODE_F64_CEIL: 0x9b,
  OPCODE_F64_FLOOR: 0x9c,
  OPCODE_F64_TRUNC: 0x9d,
  OPCODE_F64_NEAREST: 0x9e,
  OPCODE_F64_SQRT: 0x9f,
  OPCODE_F64_ADD: 0xa0,
  OPCODE_F64_SUB: 0xa1,
  OPCODE_F64_MUL: 0xa2,
  OPCODE_F64_DIV: 0xa3,
  OPCODE_F64_MIN: 0xa4,
  OPCODE_F64_MAX: 0xa5,
  OPCODE_F64_COPYSIGN: 0xa6,
  // conversions
  OPCODE_I32_WRAP_I64: 0xa7,
  OPCODE_I32_TRUNC_S_F32: 0xa8,
  OPCODE_I32_TRUNC_U_F32: 0xa9,
  OPCODE_I32_TRUNC_S_F64: 0xaa,
  OPCODE_I32_TRUNC_U_F64: 0xab,
  OPCODE_I64_EXTEND_S_I32: 0xac,
  OPCODE_I64_EXTEND_U_I32: 0xad,
  OPCODE_I64_TRUNC_S_F32: 0xae,
  OPCODE_I64_TRUNC_U_F32: 0xaf,
  OPCODE_I64_TRUNC_S_F64: 0xb0,
  OPCODE_I64_TRUNC_U_F64: 0xb1,
  OPCODE_F32_CONVERT_S_I32: 0xb2,
  OPCODE_F32_CONVERT_U_I32: 0xb3,
  OPCODE_F32_CONVERT_S_I64: 0xb4,
  OPCODE_F32_CONVERT_U_I64: 0xb5,
  OPCODE_F32_DEMOTE_F64: 0xb6,
  OPCODE_F64_CONVERT_S_I32: 0xb7,
  OPCODE_F64_CONVERT_U_I32: 0xb8,
  OPCODE_F64_CONVERT_S_I64: 0xb9,
  OPCODE_F64_CONVERT_U_I64: 0xba,
  OPCODE_F64_PROMOTE_F32: 0xbb,
  // reinterpretations
  OPCODE_I32_REINTERPRET_F32: 0xbc,
  OPCODE_I64_REINTERPRET_F64: 0xbd,
  OPCODE_F32_REINTERPRET_I32: 0xbe,
  OPCODE_F64_REINTERPRET_I64: 0xbf,
  MAGIC: 0x6d736100,
  VERSION: 0x1,
  INITIAL_MEMORY: 256,
  MAXIMUM_MEMORY: 256,
  SECTION_TYPE: 0x1,
  SECTION_FUNCTION: 0x3,
  SECTION_TABLE: 0x4,
  SECTION_MEMORY: 0x5,
  SECTION_GLOBAL: 0x6,
  SECTION_EXPORT: 0x7,
  SECTION_ELEMENT: 0x9,
  SECTION_CODE: 0xa,
  TYPE_VOID: 0x0,
  TYPE_I32: 0x7f,
  TYPE_I64: 0x7e,
  TYPE_F32: 0x7d,
  TYPE_F64: 0x7c,
  TYPE_CTOR_VOID: 0x0,
  TYPE_CTOR_I32: 0x7f,
  TYPE_CTOR_I64: 0x7e,
  TYPE_CTOR_F32: 0x7d,
  TYPE_CTOR_F64: 0x7c,
  TYPE_CTOR_FUNC: 0x60,
  TYPE_CTOR_ANYFUNC: 0x70,
  TYPE_CTOR_BLOCK: 0x40,
  EXTERN_FUNCTION: 0x0,
  EXTERN_TABLE: 0x1,
  EXTERN_MEMORY: 0x2,
  EXTERN_GLOBAL: 0x3,
  EXTERN_FUNC: 0x3
};

class ByteArray extends Array {
  emitU8(value) {
    this.push(value & 0xff);
  }
  emitU16(value) {
    this.push(value & 0xff);
    this.push(value >> 8 & 0xff);
  }
  emitU32(value) {
    this.push(value & 0xff);
    this.push(value >> 8 & 0xff);
    this.push(value >> 16 & 0xff);
    this.push(value >> 24 & 0xff);
  }
  emitU32v(value) {
    while (true) {
      let v = value & 0xff;
      value = value >>> 7;
      if (value == 0) {
        this.push(v);
        break;
      }
      this.push(v | 0x80);
    }
  }
  emit32v(value) {
    while (true) {
      var element = value & 127;
      value = value >> 7;
      var done = value === 0 && (element & 64) === 0 || value === -1 && (element & 64) !== 0;
      if (!done) {
        element = element | 128;
      }
      this.push(element & 255);
      if (done) break;
    }
  }
  emitULEB128(value) {
    let el = 0;
    do {
      el = value & 0x7F;
      value = value >>> 7;
      if (value) el = el | 0x80;
      this.push(el);
    } while (value);
  }
  emitLEB128(value) {
    let el = 0;
    do {
      el = value & 0x7F;
      value = value >>> 7;
      let sign = (el & 0x40) !== 0;
      if (value === 0 && !sign || value === -1 && sign) {
        this.push(el);
        break;
      } else {
        el = el | 0x80;
        this.push(el);
      }
    } while (true);
  }
  patchLEB128(value, offset) {
    let el = 0;
    let idx = 0;
    do {
      el = value & 0x7F;
      value = value >>> 7;
      let sign = (el & 0x40) !== 0;
      if (value === 0 && !sign || value === -1 && sign) {
        this[offset + idx] = el;
        break;
      } else {
        el = el | 0x80;
        this[offset + idx] = el;
        idx++;
      }
    } while (true);
  }
  patchULEB128(value, offset) {
    let el = 0;
    let idx = 0;
    do {
      el = value & 0x7F;
      value = value >>> 7;
      if (value) el = el | 0x80;
      this[offset + idx] = el;
      idx++;
    } while (value);
  }
  createU32vPatch() {
    this.writeVarUnsigned(~0);
    let offset = this.length;
    return {
      offset: offset,
      patch: value => {
        this.patchU32v(value, offset - 5);
      }
    };
  }
  patchU32v(value, offset) {
    var current = value >>> 0;
    var max = -1 >>> 0;
    while (true) {
      var element = current & 127;
      current = current >>> 7;
      max = max >>> 7;
      if (max !== 0) {
        element = element | 128;
      }
      this[offset] = element & 255;
      offset++;
      if (max === 0) break;
    }
  }
  writeVarUnsigned(value) {
    var current = value >>> 0;
    while (true) {
      var element = current & 127;
      current = current >>> 7;
      if (current !== 0) {
        element = element | 128;
      }
      this.push(element & 255);
      if (current === 0) {
        break;
      }
    }
  }
  createLEB128Patch() {
    let offset = this.length;
    this.emitU8(0);
    return {
      offset: offset,
      patch: value => this.patchLEB128(value, offset)
    };
  }
  createULEB128Patch() {
    let offset = this.length;
    this.emitU8(0);
    return {
      offset: offset,
      patch: value => this.patchULEB128(value, offset)
    };
  }
  emitUi32(value) {
    value = value | 0;
    this.emitU8(WASM.OPCODE_I32_CONST);
    this.writeVarUnsigned(value);
  }
  emitLoad32() {
    this.emitU8(WASM.OPCODE_I32_LOAD);
    // i32 alignment
    this.emitU8(2);
    this.writeVarUnsigned(0);
  }
  emitStore32() {
    this.emitU8(WASM.OPCODE_I32_STORE);
    this.emitU8(2); // i32 alignment
    this.writeVarUnsigned(0);
  }
  emitString(str) {
    var length = str.length | 0;
    this.emitU32v(length);
    var offset = this.length;
    var ii = 0;
    while (ii < length) {
      this.push(str.charCodeAt(ii) & 0xff);
      ii++;
    }
  }
}

class Compiler {
  constructor(imports = null) {
    this.reset(imports);
  }

  reset(imports) {
    this.bytes = new ByteArray();
    this.scope = null;
    this._global = null;
    this.pindex = 0;
    this.tokens = null;
    this.current = null;
    this.__imports = imports;
    this.currentHeapOffset = null;
  }
}

// # compiler syngleton
var compiler = new Compiler();

// # Scope #
function Scope() {
  this.node = null;
  this.index = 0;
  this.parent = null;
  this.symbols = {};
  // used to assign local variable indices
  this.localIndex = 0;
  this.resolve = function (id) {
    if (this.symbols[id]) {
      return this.symbols[id];
    } else {
      // recursively search symbol inside parent
      if (this.parent) {
        return this.parent.resolve(id);
      } else {
        compiler.__imports.error(id + " is not defined");
      }
    }
    return null;
  };
  this.register = function (id, node) {
    if (node.kind === Nodes.FunctionDeclaration) {
      this.registerFunction(id, node);
      return;
    }
    if (this.symbols[id] !== void 0) {
      compiler.__imports.error("Symbol " + id + " is already defined");
    }
    this.symbols[id] = node;
    // append local index for non-global variables
    if (this.parent !== null) {
      if (node.kind === Nodes.VariableDeclaration || node.kind === Nodes.Parameter) {
        let scope = lookupFunctionScope(this);
        node.index = scope.localIndex++;
      }
    }
  };
  this.registerFunction = function (id, node) {
    // allow function to get overwritten (e.g function prototypes)
    let resolve = this.symbols[id] || null;
    // function already defined, overwrite if prototype
    if (resolve) {
      if (resolve.type !== node.type) {
        compiler.__imports.error(`Conflicting types for '${id}'`);
      }
      // TODO: validate parameter types
      if (!resolve.isPrototype && !node.isPrototype) {
        compiler.__imports.error(`Redefinition of '${id}'`);
      }
    }
    this.symbols[id] = node;
  };
}

function lookupFunctionScope(scope) {
  let ctx = scope;
  while (ctx !== null) {
    if (ctx.node.kind === Nodes.FunctionDeclaration) break;
    ctx = ctx.parent;
  }
  return ctx;
}

function pushScope(node) {
  let scp = new Scope();
  scp.node = node;
  scp.parent = compiler.scope;
  scp.index = compiler.scope ? compiler.scope.index + 1 : 0;
  node.context = scp;
  compiler.scope = scp;
}

function popScope() {
  if (compiler.scope !== null) {
    compiler.scope = compiler.scope.parent;
  }
}

function expectScope(node, kind) {
  let item = compiler.scope;
  while (item !== null) {
    if (item && item.node.kind === kind) break;
    item = item.parent;
  }
  if (item === null && kind !== null) {
    compiler.__imports.error("Invalid scope of node " + node.kind + ", expected", kind);
  }
}

function evalExpression(node) {
  let kind = node.kind;
  switch (kind) {
    case Nodes.BinaryExpression:
      return evalBinaryExpression(node);
      break;
    case Nodes.Literal:
      return evalLiteral(node);
      break;
    default:
      compiler.__imports.error(`Unexpected node kind ${getLabelName(kind)}`);
      break;
  }
  return 0;
}

function evalLiteral(node) {
  let type = node.type;
  switch (type) {
    case Token.NumericLiteral:
    case Token.HexadecimalLiteral:
      return parseInt(node.value);
    case Token.Identifier:
      return compiler.scope.resolve(node.value).resolvedValue;
      break;
  }
}

function evalBinaryExpression(node) {
  let op = node.operator;
  let left = evalExpression(node.left);
  let right = evalExpression(node.right);
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "%":
      return left % right;
    case "^":
      return left ^ right;
    case "&":
      return left & right;
    case "|":
      return left | right;
    case "<<":
      return left << right;
    case ">>":
      return left >> right;
    case "||":
      return (left || right) | 0;
    case "&&":
      return (left && right) | 0;
    case "==":
      return left == right | 0;
    case "!=":
      return left != right | 0;
    case "<":
      return left < right | 0;
    case "<=":
      return left <= right | 0;
    case ">":
      return left > right | 0;
    case ">=":
      return left >= right | 0;
  }
}

function isBinaryOperator(token) {
  let kind = token.kind;
  return (kind === Operators.ASS || kind === Operators.ADD || kind === Operators.SUB || kind === Operators.MUL || kind === Operators.DIV || kind === Operators.MOD || kind === Operators.OR || kind === Operators.AND || kind === Operators.BIN_AND || kind === Operators.BIN_OR || kind === Operators.BIN_XOR || kind === Operators.BIN_SHL || kind === Operators.BIN_SHR || kind === Operators.NOT || kind === Operators.LT || kind === Operators.LE || kind === Operators.GT || kind === Operators.GE || kind === Operators.EQ || kind === Operators.NEQ || kind === Operators.ADD_ASS || kind === Operators.SUB_ASS || kind === Operators.MUL_ASS || kind === Operators.DIV_ASS || kind === Operators.MOD_ASS || kind === Operators.BIN_AND_ASS || kind === Operators.BIN_OR_ASS || kind === Operators.BIN_XOR_ASS || kind === Operators.BIN_SHL_ASS || kind === Operators.BIN_SHR_ASS) && kind !== Operators.NOT && kind !== Operators.INCR && kind !== Operators.DECR;
}

function isAssignmentOperator(kind) {
  return kind === Operators.ASS || kind === Operators.ADD_ASS || kind === Operators.SUB_ASS || kind === Operators.MUL_ASS || kind === Operators.DIV_ASS || kind === Operators.MOD_ASS || kind === Operators.BIN_AND_ASS || kind === Operators.BIN_OR_ASS || kind === Operators.BIN_XOR_ASS || kind === Operators.BIN_SHL_ASS || kind === Operators.BIN_SHR_ASS;
}

function isUnaryPrefixOperator(token) {
  let kind = token.kind;
  return kind === Operators.BIN_AND || kind === Operators.MUL || kind === Operators.BIN_NOT || kind === Operators.SUB || kind === Operators.ADD || kind === Operators.NOT || kind === Operators.INCR || kind === Operators.DECR;
}

function isUnaryPostfixOperator(token) {
  let kind = token.kind;
  return kind === Operators.INCR || kind === Operators.DECR;
}

function isLiteral(token) {
  let kind = token.kind;
  return kind === Token.NumericLiteral || kind === Token.HexadecimalLiteral || kind === Token.BooleanLiteral || kind === Token.Identifier;
}

function isNativeType(token) {
  let kind = token.kind;
  return kind === TokenList.INT || kind === TokenList.INT32 || kind === TokenList.INT64 || kind === TokenList.FLOAT || kind === TokenList.FLOAT32 || kind === TokenList.FLOAT64 || kind === TokenList.VOID || kind === TokenList.BOOLEAN;
}

// # Parser #
function parse(tkns) {
  compiler.tokens = tkns;
  compiler.pindex = -1;
  next();
  let node = {
    kind: Nodes["Program"],
    body: null
  };
  pushScope(node);
  compiler.global = compiler.scope;
  node.body = parseBlock();
  return node;
}

function peek(kind) {
  return compiler.current && compiler.current.kind === kind;
}

function next() {
  compiler.pindex++;
  compiler.current = compiler.tokens[compiler.pindex];
}

function expect(kind) {
  const { current, __imports } = compiler;
  if (current.kind !== kind) {
    __imports.error("Expected " + getLabelName(kind) + " but got " + getLabelName(current.kind) + " in " + current.line + ":" + current.column);
  } else {
    next();
  }
}

function expectIdentifier() {
  const { current, __imports } = compiler;
  if (current.kind !== Token.IDENTIFIER) {
    __imports.error("Expected " + Token.IDENTIFIER + ":identifier but got " + getLabelName(current.kind) + ":" + current.value);
  }
}

function eat(kind) {
  if (peek(kind)) {
    next();
    return true;
  }
  return false;
}

function parseBlock() {
  let node = {
    kind: Nodes.BlockStatement,
    body: [],
    context: compiler.scope
  };
  while (true) {
    if (!compiler.current) break;
    if (peek(TokenList.RBRACE)) break;
    let child = parseStatement();
    if (child === null) break;
    node.body.push(child);
  }
  return node;
}

function parseStatement() {
  const { current, __imports } = compiler;
  let node = null;
  if (eat(TokenList.EXPORT)) {
    node = parseDeclaration(true);
  } else if (peek(TokenList.ENUM)) {
    node = parseEnumDeclaration();
  } else if (isNativeType(current)) {
    node = parseDeclaration(false);
  } else if (peek(TokenList.RETURN)) {
    node = parseReturnStatement();
  } else if (peek(TokenList.IF)) {
    node = parseIfStatement();
  } else if (peek(TokenList.WHILE)) {
    node = parseWhileStatement();
  } else {
    node = parseExpression(Operators.LOWEST);
    if (node === null) {
      __imports.error("Unknown node kind " + current.value + " in " + current.line + ":" + current.column);
    }
  }
  eat(TokenList.SEMICOLON);
  return node;
}

function parseEnumDeclaration() {
  expect(TokenList.ENUM);
  let node = {
    kind: Nodes.EnumDeclaration,
    name: null,
    items: []
  };
  if (peek(Token.Identifier)) {
    node.name = compiler.current.value;
    next();
  }
  expect(TokenList.LBRACE);
  let iter = 0;
  while (true) {
    expectIdentifier();
    let emura = {
      kind: Nodes.Enumerator,
      name: compiler.current.value,
      init: null
    };
    next();
    if (eat(Operators.ASS)) {
      let expr = parseExpression(Operators.LOWEST);
      emura.init = expr;
      emura.resolvedValue = evalExpression(expr);
      iter = emura.resolvedValue;
    } else {
      emura.resolvedValue = iter;
    }
    node.items.push(emura);
    compiler.scope.register(emura.name, emura);
    // allow trailing commas
    eat(TokenList.COMMA);
    if (peek(TokenList.RBRACE)) break;
    iter++;
  }
  expect(TokenList.RBRACE);
  return node;
}

function parseDeclaration(extern) {
  let node = null;
  expectTypeLiteral();
  const type = compiler.current.kind;
  next();
  let isPointer = eat(Operators.MUL);
  // if not pointer, check if &-reference
  let isAlias = false;
  if (!isPointer) isAlias = eat(Operators.BIN_AND);
  expectIdentifier();
  const name = compiler.current.value;
  next();
  const token = compiler.current.kind;
  if (token === Operators.ASS) {
    node = parseVariableDeclaration(type, name, extern, isPointer, isAlias);
  } else if (TokenList.LPAREN) {
    node = parseFunctionDeclaration(type, name, extern);
  } else {
    node = null;
    compiler.__imports.error("Invalid keyword: " + compiler.current.value);
  }
  return node;
}

function parseWhileStatement() {
  let node = {
    kind: Nodes.WhileStatement,
    condition: null,
    body: null
  };
  expect(TokenList.WHILE);
  node.condition = parseExpression(Operators.LOWEST);
  // braced body
  if (eat(TokenList.LBRACE)) {
    pushScope(node);
    node.body = parseBlock();
    popScope();
    expect(TokenList.RBRACE);
    // short body
  } else {
    node.body = parseExpression(Operators.LOWEST);
  }
  return node;
}

function parseIfStatement() {
  let node = {
    kind: Nodes.IfStatement,
    condition: null,
    alternate: null,
    consequent: null
  };
  // else
  if (!eat(TokenList.IF)) {
    pushScope(node);
    node.consequent = parseIfBody();
    popScope();
    return node;
  }
  expect(TokenList.LPAREN);
  node.condition = parseExpression(Operators.LOWEST);
  expect(TokenList.RPAREN);
  pushScope(node);
  node.consequent = parseIfBody();
  popScope();
  if (eat(TokenList.ELSE)) {
    node.alternate = parseIfStatement();
  }
  return node;
}

function parseIfBody() {
  let node = null;
  // braced if
  if (eat(TokenList.LBRACE)) {
    node = parseBlock();
    expect(TokenList.RBRACE);
    // short if
  } else {
    node = [];
    node.push(parseExpression(Operators.LOWEST));
    eat(TokenList.SEMICOLON);
  }
  return node;
}

function parseReturnStatement() {
  expect(TokenList.RETURN);
  let node = {
    kind: Nodes.ReturnStatement,
    argument: null
  };
  if (!peek(TokenList.SEMICOLON)) {
    node.argument = parseExpression(Operators.LOWEST);
  }
  expectScope(node, Nodes.FunctionDeclaration);
  let item = compiler.scope;
  while (item !== null) {
    if (item && item.node.kind === Nodes.FunctionDeclaration) break;
    item = item.parent;
  }
  item.node.returns.push(node);
  return node;
}

function parseFunctionDeclaration(type, name, extern) {
  let node = {
    index: 0,
    isExported: !!extern,
    kind: Nodes.FunctionDeclaration,
    type: type,
    id: name,
    locals: [],
    returns: [],
    parameter: null,
    prototype: null,
    body: null
  };
  // only allow global functions
  expectScope(node, null);
  node.parameter = parseFunctionParameters(node);
  node.isPrototype = !eat(TokenList.LBRACE);
  compiler.scope.register(name, node);
  if (!node.isPrototype) {
    pushScope(node);
    node.parameter.map(param => {
      compiler.scope.register(param.value, param);
    });
    node.body = parseBlock();
    popScope();
    expect(TokenList.RBRACE);
  }
  if (node.prototype !== null && node.type !== TokenList.VOID && !node.returns.length) {
    compiler.__imports.error("Missing return in function: " + node.id);
  }
  // auto insert a empty return for void functions
  if (!node.returns.length && node.type === TokenList.VOID) {
    let ret = {
      kind: Nodes.ReturnStatement,
      argument: null
    };
    node.returns.push(ret);
    node.body.body.push(ret);
  }
  // auto insert return 0 for non-return main
  if (node.id === "main" && !node.returns.length) {
    let ret = {
      kind: Nodes.ReturnStatement,
      argument: {
        kind: Nodes.Literal,
        type: Token.NumericLiteral,
        value: "0"
      }
    };
    node.returns.push(ret);
    node.body.body.push(ret);
  }
  return node;
}

function parseFunctionParameters(node) {
  let params = [];
  let hasPrototype = node.prototype !== null;
  expect(TokenList.LPAREN);
  while (true) {
    if (peek(TokenList.RPAREN)) break;
    let param = parseFunctionParameter(node);
    params.push(param);
    if (!eat(TokenList.COMMA)) break;
  }
  expect(TokenList.RPAREN);
  return params;
}

function parseFunctionParameter(node) {
  let type = null;
  // type
  if (isNativeType(compiler.current)) {
    type = compiler.current.kind;
    next();
  } else {
    compiler.__imports.error("Missing type for parameter in", node.id);
  }
  // *&
  let isPointer = eat(Operators.MUL);
  let isReference = false;
  if (!isPointer) {
    isReference = eat(Operators.BIN_AND);
  }
  // id
  expectIdentifier();
  let param = compiler.current;
  param.type = type;
  param.kind = Nodes.Parameter;
  param.isParameter = true;
  param.isPointer = isPointer;
  param.isReference = isReference;
  next();
  return param;
}

function parseVariableDeclaration(type, name, extern, isPointer, isAlias) {
  let node = {
    kind: Nodes.VariableDeclaration,
    type: type,
    id: name,
    init: null,
    isGlobal: false,
    isPointer,
    isAlias
  };
  // only allow export of global variables
  if (extern) expectScope(node, null);
  //expectScope(node, Nodes.FunctionDeclaration);
  compiler.scope.register(node.id, node);
  if (compiler.scope.parent === null) {
    node.isGlobal = true;
  }
  expect(Operators.ASS);
  let init = parseExpression(Operators.LOWEST);
  node.init = {
    kind: Nodes.BinaryExpression,
    left: {
      kind: Nodes.Literal,
      type: Token.Identifier,
      value: node.id
    },
    right: init,
    operator: "="
  };
  if (isAlias) {
    node.aliasValue = init;
    node.aliasReference = {
      kind: Nodes.UnaryPrefixExpression,
      operator: "&",
      value: node.aliasValue
    };
  }
  if (!node.isGlobal) {
    let fn = lookupFunctionScope(compiler.scope).node;
    fn.locals.push(node);
  } else {
    node.resolvedValue = evalExpression(node.init.right);
  }
  return node;
}

function parseCallExpression(id) {
  let node = {
    kind: Nodes.CallExpression,
    callee: id,
    parameter: parseCallParameters(id.value)
  };
  return node;
}

function parseCallParameters(id) {
  let params = [];
  let callee = compiler.scope.resolve(id);
  expect(TokenList.LPAREN);
  let index = 0;
  while (true) {
    if (peek(TokenList.RPAREN)) break;
    let expr = parseExpression(Operators.LOWEST);
    //let isReference = callee.parameter[index].isReference;
    //let isReference = false;
    // called functions parameter expects reference
    /*if (isReference && expr.kind === Nodes.Literal) {
      // wrap pass-by-reference node around passed in expression
      expr = {
        kind: Nodes.UnaryPrefixExpression,
        operator: "&",
        value: expr
      };
    }*/
    params.push(expr);
    if (!eat(TokenList.COMMA)) break;
    index++;
  }
  expect(TokenList.RPAREN);
  return params;
}

function parseBreak() {
  let node = {
    kind: Nodes.BreakStatement
  };
  expect(TokenList.BREAK);
  expectScope(node, Nodes.WhileStatement);
  return node;
}

function parseContinue() {
  let node = {
    kind: Nodes.ContinueStatement
  };
  expect(TokenList.CONTINUE);
  expectScope(node, Nodes.WhileStatement);
  return node;
}

function expectTypeLiteral() {
  if (!isNativeType(compiler.current)) {
    compiler.__imports.error("Expected type literal but got " + compiler.current.kind);
  }
}

function parseUnaryPrefixExpression() {
  let node = {
    kind: Nodes.UnaryPrefixExpression,
    operator: compiler.current.value,
    value: null
  };
  next();
  node.value = parseExpression(Operators.UNARY_PREFIX);
  return node;
}

function parseUnaryPostfixExpression(left) {
  let node = {
    kind: Nodes.UnaryPostfixExpression,
    operator: compiler.current.value,
    value: left
  };
  next();
  return node;
}

function parsePrefix() {
  if (isLiteral(compiler.current)) {
    return parseLiteral();
  }
  if (eat(TokenList.LPAREN)) {
    let node = parseExpression(Operators.LOWEST);
    expect(TokenList.RPAREN);
    return node;
  }
  if (isUnaryPrefixOperator(compiler.current)) {
    return parseUnaryPrefixExpression();
  }
  return parseExpression(Operators.LOWEST);
}

function parseBinaryExpression(level, left) {
  let operator = compiler.current.value;
  let precedence = Operators[operator];
  if (level > precedence) return left;
  let node = {
    kind: Nodes.BinaryExpression,
    left: left,
    right: null,
    operator: operator
  };
  next();
  node.right = parseExpression(precedence);
  let okind = Operators[operator];
  if (isAssignmentOperator(okind) && okind !== Operators.ASS) {
    let right = {
      kind: Nodes.BinaryExpression,
      left: node.left,
      operator: "=",
      right: {
        kind: Nodes.BinaryExpression,
        operator: operator.slice(0, operator.length - 1),
        left: node.left,
        right: node.right
      }
    };
    node = right;
  }
  return node;
}

function parseInfix(level, left) {
  if (isBinaryOperator(compiler.current)) {
    return parseBinaryExpression(level, left);
  }
  if (isUnaryPostfixOperator(compiler.current)) {
    if (level >= Operators.UNARY_POSTFIX) {
      return left;
    }
    return parseUnaryPostfixExpression(left);
  }
  if (peek(TokenList.LPAREN)) {
    return parseCallExpression(left);
  }
  return left;
}

function parseExpression(level) {
  if (peek(TokenList.BREAK)) {
    return parseBreak();
  }
  if (peek(TokenList.CONTINUE)) {
    return parseContinue();
  }
  let node = parsePrefix();
  while (true) {
    if (!compiler.current) break;
    let expr = parseInfix(level, node);
    if (expr === null || expr === node) break;
    node = expr;
  }
  return node;
}

function parseLiteral() {
  let value = compiler.current.value;
  if (compiler.current.kind === Token.IDENTIFIER) {
    /*let ignore = (
      value === "free" ||
      value === "malloc"
    );
    // manually register native calls
    if (ignore && !global.symbols[value]) {
      global.register(value, {});
    }*/
    // make sure the identifier can be resolved
    compiler.scope.resolve(value);
  }
  let node = {
    kind: Nodes.Literal,
    type: compiler.current.kind,
    value: value
  };
  next();
  return node;
}

function isBlank(cc) {
  return cc === 9 || cc === 11 || cc === 12 || cc === 32 || cc === 160;
}



function isAlpha(cc) {
  return cc >= 65 && cc <= 90 || cc >= 97 && cc <= 122 || cc === 95;
}

function isNumber(cc) {
  return cc >= 48 && cc <= 57;
}

function isHex(cc) {
  return isNumber(cc) || cc >= 97 && cc <= 102;
}

function isPunctuatorChar(ch) {
  return ch === "(" || ch === ")" || ch === "{" || ch === "}" || ch === "," || ch === ";";
}

function isOperatorChar(ch) {
  return ch === "=" || ch === "+" || ch === "-" || ch === "%" || ch === "!" || ch === "|" || ch === "&" || ch === "~" || ch === "^" || ch === ">" || ch === "<" || ch === "*" || ch === "/";
}

function isOperator(str) {
  if (str.length === 1) {
    return isOperatorChar(str);
  }
  return str === "++" || str === "--" || str === "==" || str === ">=" || str === "<=" || str === "!=" || str === "||" || str === "&&" || str === "<<" || str === ">>" || str === "+=" || str === "-=" || str === "*=" || str === "/=" || str === "%=" || str === "^=" || str === "&=" || str === "|=" || str === "^=" || str === "<<=" || str === ">>=";
}

function processToken(tokens, value, line, column) {
  let kind = Token.UNKNOWN;
  if (TokenList[value] >= 0) kind = TokenList[value];else if (Operators[value] >= 0) kind = Operators[value];else kind = Token["Identifier"];
  let token = createToken(kind, value, line, column - value.length);
  tokens.push(token);
  return token;
}

// # Scanner #
function createToken(kind, value, line, column) {
  let token = {
    kind: kind,
    value: value,
    line: line,
    column: column
  };
  return token;
}

function scan(str) {
  let ii = -1;
  let line = 1;
  let column = 0;
  let length = str.length;
  let tokens = [];

  function next() {
    ii++;
    column++;
  }

  // placed here to have correct context to next()
  function processOperator(ch, idx, line, column) {
    let second = str.slice(idx + 1, idx + 2);
    let third = str.slice(idx + 2, idx + 3);
    if (second && isOperator(ch + second)) {
      if (third && isOperator(ch + second + third)) {
        next();
        next();
        processToken(tokens, ch + second + third, line, column);
      } else {
        next();
        processToken(tokens, ch + second, line, column);
      }
    } else if (isOperator(ch)) {
      processToken(tokens, ch, line, column);
    }
  }

  while (true) {
    next();
    let ch = str.charAt(ii);
    let cc = str.charCodeAt(ii);
    // blank [/s,/n]
    if (isBlank(cc)) {
      continue;
    }
    if (cc === 10) {
      line++;
      column = 0;
      continue;
    }
    // alphabetical [aA-zZ]
    if (isAlpha(cc)) {
      let start = ii;
      while (true) {
        if (!isAlpha(cc) && !isNumber(cc)) {
          ii--;
          column--;
          break;
        }
        next();
        cc = str.charCodeAt(ii);
      }
      let content = str.slice(start, ii + 1);
      processToken(tokens, content, line, column);
      continue;
    }
    // number [0-9,-0]
    if (isNumber(cc)) {
      // hexadecimal
      if (str.charAt(ii + 1) === "x") {
        let start = ii;
        next();
        while (true) {
          if (!isHex(cc)) {
            ii--;
            column--;
            break;
          }
          next();
          cc = str.charCodeAt(ii);
        }
        let content = str.slice(start, ii + 1);
        let token = createToken(Token.HexadecimalLiteral, content, line, column);
        tokens.push(token);
        continue;
      }
      let start = ii;
      while (true) {
        if (!isNumber(cc) && cc !== 45) {
          ii--;
          column--;
          break;
        }
        next();
        cc = str.charCodeAt(ii);
      }
      let content = str.slice(start, ii + 1);
      let token = createToken(Token.NumericLiteral, content, line, column);
      tokens.push(token);
      continue;
    }
    // comment [//]
    if (ch === "/" && str[ii + 1] === "/") {
      // TODO: add support for /* */
      while (true) {
        if (cc === 10) {
          column = 0;
          line++;
          break;
        }
        next();
        cc = str.charCodeAt(ii);
      }
      continue;
    }
    // punctuator [;,(,)]
    if (isPunctuatorChar(ch)) {
      let content = str.slice(ii, ii + 1);
      processToken(tokens, content, line, column);
      continue;
    }
    // single operator [+,-,=]
    if (isOperatorChar(ch)) {
      processOperator(ch, ii, line, column);
      continue;
    }
    if (ii >= length) {
      break;
    }
  }
  return tokens;
}

const $INCONSTANT_GLOBAL_INITIALIZERS = false;

function getWasmType(type) {
  switch (type) {
    case TokenList.VOID:
      return WASM.TYPE_CTOR_VOID;
    case TokenList.INT:case TokenList.INT32:
      return WASM.TYPE_CTOR_I32;
    case TokenList.INT64:
      return WASM.TYPE_CTOR_I64;
    case TokenList.FLOAT:case TokenList.FLOAT32:
      return WASM.TYPE_CTOR_I32;
    case TokenList.FLOAT64:
      return WASM.TYPE_CTOR_F64;
    case TokenList.BOOL:
      return WASM.TYPE_CTOR_I32;
  }
  return -1;
}





function getWasmOperator(op) {
  switch (op) {
    case "+":
      return WASM.OPCODE_I32_ADD;
    case "-":
      return WASM.OPCODE_I32_SUB;
    case "*":
      return WASM.OPCODE_I32_MUL;
    case "/":
      return WASM.OPCODE_I32_DIV_S;
    case "%":
      return WASM.OPCODE_I32_REM_S;
    case "^":
      return WASM.OPCODE_I32_XOR;
    case "|":
      return WASM.OPCODE_I32_OR;
    case "&":
      return WASM.OPCODE_I32_AND;
    case "<":
      return WASM.OPCODE_I32_LT_S;
    case "<=":
      return WASM.OPCODE_I32_LE_S;
    case ">":
      return WASM.OPCODE_I32_GT_S;
    case ">=":
      return WASM.OPCODE_I32_GE_S;
    case "==":
      return WASM.OPCODE_I32_EQ;
    case "!=":
      return WASM.OPCODE_I32_NEQ;
    case "&&":
      return WASM.OPCODE_I32_AND;
    case "||":
      return WASM.OPCODE_I32_OR;
    case "<<":
      return WASM.OPCODE_I32_SHL;
    case ">>":
      return WASM.OPCODE_I32_SHR_S;
    default:
      return -1;
  }
}

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
function emit(node) {
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
}

function emitTypeSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_TYPE);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map(child => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      compiler.bytes.emitU8(WASM.TYPE_CTOR_FUNC);
      // parameter count
      compiler.bytes.writeVarUnsigned(child.parameter.length);
      // parameter types
      child.parameter.map(param => {
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
}

function emitFunctionSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_FUNCTION);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map(child => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      amount++;
      compiler.bytes.writeVarUnsigned(child.index);
    }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
}

function emitTableSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_TABLE);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 1;
  // mvp only allows <= 1
  emitFunctionTable(node);
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
}

function emitFunctionTable(node) {
  // type
  compiler.bytes.emitU8(WASM.TYPE_CTOR_ANYFUNC);
  // flags
  compiler.bytes.emitU8(1);
  let count = 0;
  node.body.map(child => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      count++;
    }
  });
  // initial
  compiler.bytes.writeVarUnsigned(count);
  // max
  compiler.bytes.writeVarUnsigned(count);
}

function emitMemorySection(node) {
  compiler.bytes.emitU8(WASM.SECTION_MEMORY);
  // we dont use memory yet, write empty bytes
  let size = compiler.bytes.createU32vPatch();
  compiler.bytes.emitU32v(1);
  compiler.bytes.emitU32v(0);
  compiler.bytes.emitU32v(1);
  size.patch(compiler.bytes.length - size.offset);
}

function emitGlobalSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_GLOBAL);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map(child => {
    // global variable
    if (child.kind === Nodes.VariableDeclaration && child.isGlobal) {
      let init = child.init.right;
      // globals have their own indices, patch it here
      child.index = amount++;
      compiler.bytes.emitU8(getWasmType(child.type));
      // mutability, enabled by default
      compiler.bytes.emitU8(1);
      if ($INCONSTANT_GLOBAL_INITIALIZERS) {
        compiler.bytes.emitU8(WASM.OPCODE_I32_CONST);
        compiler.bytes.emitLEB128(child.resolvedValue);
      } else {
        emitNode(init);
      }
      compiler.bytes.emitU8(WASM.OPCODE_END);
    }
    // global enum
    else if (child.kind === Nodes.EnumDeclaration) {
        child.index = amount++;
        // force int32 for now
        compiler.bytes.emitU8(WASM.TYPE_CTOR_I32);
        // mutability, enabled by default
        compiler.bytes.emitU8(1);
        // allow resolved values
        compiler.bytes.emitU8(WASM.OPCODE_I32_CONST);
        compiler.bytes.emitLEB128(child.resolvedValue);
        compiler.bytes.emitU8(WASM.OPCODE_END);
      }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
}

function emitExportSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_EXPORT);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  // export functions
  node.body.map(child => {
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
}

function emitElementSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_ELEMENT);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map(child => {
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
}

function emitCodeSection(node) {
  compiler.bytes.emitU8(WASM.SECTION_CODE);
  let size = compiler.bytes.createU32vPatch();
  let count = compiler.bytes.createU32vPatch();
  let amount = 0;
  node.body.map(child => {
    if (child.kind === Nodes.FunctionDeclaration && !child.isPrototype) {
      emitFunction(child);
      amount++;
    }
  });
  count.patch(amount);
  size.patch(compiler.bytes.length - size.offset);
}

function growHeap(amount) {
  compiler.currentHeapOffset += amount;
}

function emitNode(node) {
  let kind = node.kind;
  if (kind === Nodes.BlockStatement) {
    let actual = node.context.node;
    // if, while auto provide a block scope
    let skip = actual.kind === Nodes.IfStatement || actual.kind === Nodes.WhileStatement || actual.kind === Nodes.FunctionDeclaration;
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
    node.body.map(child => {
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
    if (node.condition) compiler.bytes.emitU8(WASM.OPCODE_END);
  } else if (kind === Nodes.ReturnStatement) {
    if (node.argument) emitNode(node.argument);
    compiler.bytes.emitU8(WASM.OPCODE_RETURN);
  } else if (kind === Nodes.CallExpression) {
    let callee = node.callee.value;
    let resolve = compiler.scope.resolve(callee);
    node.parameter.map(child => {
      emitNode(child);
    });
    if (resolve.isPointer) {
      compiler.bytes.emitUi32(resolve.offset);
      compiler.bytes.emitLoad32();
      compiler.bytes.emitU8(WASM.OPCODE_CALL_INDIRECT);
      compiler.bytes.writeVarUnsigned(0); // anyfunc table
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
    emitPrefixExpression(node);
  } else if (kind === Nodes.UnaryPostfixExpression) {
    emitPostfixExpression(node);
  } else if (kind === Nodes.BinaryExpression) {
    let operator = node.operator;
    if (operator === "=") {
      emitAssignment(node);
    } else if (operator === "&&" || operator === "||") {
      // &&, || => l >= 1, r >= 1
      // left
      emitNode(node.left);
      compiler.bytes.emitUi32(1);
      compiler.bytes.emitU8(WASM.OPCODE_I32_GE_S);
      // right
      emitNode(node.right);
      compiler.bytes.emitUi32(1);
      compiler.bytes.emitU8(WASM.OPCODE_I32_GE_S);
      // op
      compiler.bytes.emitU8(getWasmOperator(operator));
    } else {
      emitNode(node.left);
      emitNode(node.right);
      compiler.bytes.emitU8(getWasmOperator(operator));
    }
  } else {
    compiler.__imports.error("Unknown node kind " + kind);
  }
}

// expect var|&
function resolveLValue(node) {
  if (node.kind === Nodes.UnaryPrefixExpression) {
    return resolveLValue(node.value);
  }
  return node;
}

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
}

// *var *(*expr)
function emitDereference(node) {
  emitNode(node.value);
  compiler.bytes.emitLoad32();
}

// *ptr = node
function emitPointerAssignment(node) {
  emitNode(node.left.value);
  // push the address to assign
  emitNode(node.right);
  // store it
  compiler.bytes.emitStore32();
}

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
  } else if (resolve.isAlias) {
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
  }
  // assign to default parameter
  /*else if (resolve.isParameter && !resolve.isPointer) {
    emitNode(node.right);
    compiler.bytes.emitU8(WASM.OPCODE_SET_LOCAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  }*/
  // assign to default variable
  else {
      if (insideVariableDeclaration) {
        emitNode(node.right);
      } else {
        compiler.bytes.emitUi32(resolve.offset);
        emitNode(node.right);
        compiler.bytes.emitStore32();
      }
    }
}

function emitIdentifier(node) {
  let resolve = compiler.scope.resolve(node.value);
  // global variable
  if (resolve.isGlobal) {
    compiler.bytes.emitU8(WASM.OPCODE_GET_GLOBAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  }
  // we only have access to the passed in value
  /*else if (resolve.isParameter) {
    compiler.bytes.emitU8(WASM.OPCODE_GET_LOCAL);
    compiler.bytes.writeVarUnsigned(resolve.index);
  }*/
  // pointer variable
  else if (resolve.isPointer) {
      // push the pointer's pointed to address
      compiler.bytes.emitUi32(resolve.offset);
      compiler.bytes.emitLoad32();
    } else if (resolve.isAlias) {
      // just a shortcut to the assigned value
      emitNode(resolve.aliasValue);
    }
    // parameters are stored in memory too
    else if (resolve.kind === Nodes.Parameter) {
        compiler.bytes.emitUi32(resolve.offset);
        compiler.bytes.emitLoad32();
      }
      // return the function's address
      else if (resolve.kind === Nodes.FunctionDeclaration) {
          compiler.bytes.emitUi32(resolve.index);
        }
        // default variable
        else if (resolve.kind === Nodes.VariableDeclaration) {
            // variables are stored in memory too
            compiler.bytes.emitUi32(resolve.offset);
            compiler.bytes.emitLoad32();
          }
          // enum variable
          else if (resolve.kind === Nodes.Enumerator) {
              compiler.bytes.emitU8(WASM.OPCODE_I32_CONST);
              compiler.bytes.emitLEB128(resolve.resolvedValue);
            } else {
              compiler.__imports.error("Unknown identifier kind", getLabelName(resolve.kind));
            }
}

let insideVariableDeclaration = false;
function emitVariableDeclaration(node) {
  let resolve = compiler.scope.resolve(node.id);
  node.offset = compiler.currentHeapOffset;
  // store pointer
  if (resolve.isPointer) {
    compiler.__imports.log("Store variable", node.id, "in memory at", resolve.offset);
    // # store the pointed address
    // offset
    compiler.bytes.emitUi32(resolve.offset);
    growHeap(4);
    // value
    insideVariableDeclaration = true;
    emitNode(node.init);
    insideVariableDeclaration = false;
    // store
    compiler.bytes.emitStore32();
  }
  // store alias
  else if (resolve.isAlias) {
      compiler.__imports.log("Store alias", node.id, "in memory at", resolve.offset);
      // offset
      compiler.bytes.emitUi32(resolve.offset);
      growHeap(4);
      // alias = &(init)
      emitNode(node.aliasReference);
      // store
      compiler.bytes.emitStore32();
    }
    // store variable
    else {
        compiler.__imports.log("Store variable", node.id, "in memory at", resolve.offset);
        // offset
        compiler.bytes.emitUi32(resolve.offset);
        growHeap(4);
        // value
        insideVariableDeclaration = true;
        emitNode(node.init);
        insideVariableDeclaration = false;
        // store
        compiler.bytes.emitStore32();
      }
}

function emitParameterDeclaration(node) {
  node.offset = compiler.currentHeapOffset;
  compiler.__imports.log("Store parameter", node.value, "in memory at", node.offset);
  // offset
  compiler.bytes.emitUi32(node.offset);
  growHeap(4);
  // value
  compiler.bytes.emitU8(WASM.OPCODE_GET_LOCAL);
  compiler.bytes.writeVarUnsigned(node.index);
  // store
  compiler.bytes.emitStore32();
}

function getLoopDepthIndex() {
  let ctx = compiler.scope;
  let label = 0;
  while (ctx !== null) {
    label++;
    if (ctx.node.kind === Nodes.WhileStatement) break;
    ctx = ctx.parent;
  }
  return label;
}

function emitPrefixExpression(node) {
  let operator = node.operator;
  // 0 - x
  if (operator === "-") {
    compiler.bytes.emitUi32(0);
    emitNode(node.value);
    compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
  }
  // ignored
  else if (operator === "+") {
      emitNode(node.value);
    }
    // x = 0
    else if (operator === "!") {
        emitNode(node.value);
        compiler.bytes.emitU8(WASM.OPCODE_I32_EQZ);
      }
      // ~
      else if (operator === "~") {
          // invert
          compiler.bytes.emitUi32(0);
          emitNode(node.value);
          compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
          // sub 1
          compiler.bytes.emitUi32(1);
          compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
        }
        // reference
        else if (operator === "&") {
            emitReference(node);
          }
          // dereference
          else if (operator === "*") {
              emitDereference(node);
            } else if (operator === "++" || operator === "--") {
              let op = node.operator === "++" ? WASM.OPCODE_I32_ADD : WASM.OPCODE_I32_SUB;
              // offset
              if (node.value.operator === "*") {
                emitNode(node.value.value);
              } else {
                let resolve = compiler.scope.resolve(node.value.value);
                compiler.bytes.emitUi32(resolve.offset);
              }
              // value
              emitNode(node.value);
              // add/sub
              compiler.bytes.emitUi32(1);
              compiler.bytes.emitU8(op);
              // store it
              compiler.bytes.emitStore32();
              if (node.value.operator === "*") {
                emitNode(node.value.value);
              } else {
                let resolve = compiler.scope.resolve(node.value.value);
                compiler.bytes.emitUi32(resolve.offset);
                compiler.bytes.emitLoad32();
              }
            }
}

function emitPostfixExpression(node) {
  let local = node.value;
  // store offset
  if (local.operator === "*") {
    emitNode(local.value);
  } else {
    let resolve = compiler.scope.resolve(local.value);
    compiler.bytes.emitUi32(resolve.offset);
  }
  // store value
  emitNode(local);
  compiler.bytes.emitUi32(1);
  if (node.operator === "++") compiler.bytes.emitU8(WASM.OPCODE_I32_ADD);else compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
  // pop store
  compiler.bytes.emitStore32();
  // push old value
  if (local.operator === "*") {
    emitNode(local.value);
  } else {
    let resolve = compiler.scope.resolve(local.value);
    compiler.bytes.emitUi32(resolve.offset);
    compiler.bytes.emitLoad32();
  }
  // tee the original value
  compiler.bytes.emitUi32(1);
  if (node.operator === "--") compiler.bytes.emitU8(WASM.OPCODE_I32_ADD);else compiler.bytes.emitU8(WASM.OPCODE_I32_SUB);
}

function emitFunction(node) {
  let size = compiler.bytes.createU32vPatch();
  let locals = node.locals;
  let params = node.parameter;
  // local count
  compiler.bytes.writeVarUnsigned(locals.length + params.length);
  // local entry signatures
  locals.map(local => {
    compiler.bytes.emitU8(1);
    compiler.bytes.emitU8(getWasmType(local.type));
  });
  // parameter count as locals too
  params.map(param => {
    compiler.bytes.emitU8(1);
    compiler.bytes.emitU8(getWasmType(param.type));
  });
  // register parameters
  params.map(param => {
    emitParameterDeclaration(param);
  });
  emitNode(node.body);
  // patch function body size
  compiler.bytes.emitU8(WASM.OPCODE_END);
  size.patch(compiler.bytes.length - size.offset);
}

function hexDump(array) {
  let result = Array.from(array).map(v => {
    return v.toString(16);
  });
  return result;
}

function memoryDump(array, limit) {
  let str = "";
  for (let ii = 0; ii < limit; ii += 4) {
    str += ii;
    str += ": ";
    str += array[ii + 0] + ", ";
    str += array[ii + 1] + ", ";
    str += array[ii + 2] + ", ";
    str += array[ii + 3] + " ";
    str += "\n";
  }
  return str;
}



const defaultImports = {
  log: console.log,
  error: console.error
};

function compileSource(source, imports) {
  // reset
  compiler.reset(Object.assign({}, defaultImports, imports));

  // process
  let tkns = scan(source);
  let ast = parse(tkns);
  emit(ast);

  return {
    buffer: new Uint8Array(compiler.bytes),
    ast,
    tokens: tkns
  };
}

function compile(str, imports = {}, sync) {
  const { buffer, ast } = compileSource(str, imports);
  let dump = hexDump(buffer);

  // output
  if (sync === true) {
    let module = new WebAssembly.Module(buffer);
    let instance = new WebAssembly.Instance(module);
    return {
      ast: ast,
      dump: dump,
      buffer: buffer,
      memory: instance.exports.memory,
      instance: instance,
      exports: instance.exports
    };
  }
  return new Promise((resolve, reject) => {
    WebAssembly.instantiate(buffer).then(result => {
      let instance = result.instance;
      resolve({
        ast: ast,
        dump: dump,
        buffer: buffer,
        memory: instance.exports.memory,
        instance: instance,
        exports: instance.exports
      });
    });
  });
}

// Export internal functions
compile.compileSource = compileSource;
compile.scan = scan;
compile.parse = parse;
compile.emit = emit;

if (typeof window !== "undefined") {
  window.compile = compile;
  window.memoryDump = memoryDump;
}

return compile;

})));
