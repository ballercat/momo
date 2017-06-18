"use strict";

/** # Label generation # */
let ii = 0;

export let Nodes = {};
export let Token = {};
export let TokenList = {};
export let Operators = {};

/** Types */
((Label) => {
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
((Label) => {
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
((Label) => {
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
((Label) => {
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

export function getLabelName(index) {
  index = index | 0;
  if (Nodes[index] !== void 0) return (Nodes[index]);
  if (Token[index] !== void 0) return (Token[index]);
  if (TokenList[index] !== void 0) return (TokenList[index]);
  if (Operators[index] !== void 0) return (Operators[index]);
  return ("undefined");
};

/**
 * Auto generate
 * str access key
 * for token list
 */
(() => {
  const items = [
    Nodes, Token, TokenList, Operators
  ];
  items.map((item) => {
    for (let key in item) {
      const code = parseInt(key);
      if (!(code >= 0)) continue;
      const nkey = item[key].toUpperCase();
      item[nkey] = code;
    };
  });
})();

// # Wasm codes

// control flow operators
export const WASM = {
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

