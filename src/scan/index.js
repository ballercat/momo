"use strict";
import { Token, TokenList, Operators } from "../const";
import ScannerContext from "./context";

function isBlank(cc) {
  return (
    cc === 9 ||
    cc === 11 ||
    cc === 12 ||
    cc === 32 ||
    cc === 160
  );
};

function isQuote(cc) {
  return (
    cc === 39 ||
    cc === 34
  );
};

function isAlpha(cc) {
  return (
    cc >= 65 && cc <= 90 ||
    cc >= 97 && cc <= 122 ||
    cc === 95
  );
};

function isNumber(cc) {
  return (
    cc >= 48 && cc <= 57
  );
};

function isHex(cc) {
  return (
    isNumber(cc) ||
    (cc >= 97 && cc <= 102)
  );
};

function isPunctuatorChar(ch) {
  return (
    ch === "(" ||
    ch === ")" ||
    ch === "{" ||
    ch === "}" ||
    ch === "," ||
    ch === ";"
  );
};

function isOperatorChar(ch) {
  return (
    ch === "=" ||
    ch === "+" ||
    ch === "-" ||
    ch === "%" ||
    ch === "!" ||
    ch === "|" ||
    ch === "&" ||
    ch === "~" ||
    ch === "^" ||
    ch === ">" ||
    ch === "<" ||
    ch === "*" ||
    ch === "/"
  );
};

function isOperator(str) {
  if (str.length === 1) {
    return (isOperatorChar(str));
  }
  return (
    str === "++" ||
    str === "--" ||
    str === "==" ||
    str === ">=" ||
    str === "<=" ||
    str === "!=" ||
    str === "||" ||
    str === "&&" ||
    str === "<<" ||
    str === ">>" ||
    str === "+=" ||
    str === "-=" ||
    str === "*=" ||
    str === "/=" ||
    str === "%=" ||
    str === "^=" ||
    str === "&=" ||
    str === "|=" ||
    str === "^=" ||
    str === "<<=" ||
    str === ">>="
  );
};

const isEOL = (cc) => cc === 10;

const getType = (context) => {
  const cc = context.cc();
  const ch = context.ch();
  return (isBlank(cc) && Token.Whitespace) ||
         (isEOL(cc) && Token.EOL) ||
         (isQuote(cc) && Token.Quote) ||
         (isAlpha(cc) && Token.StringLiteral) ||
         (isNumber(cc) && Token.NumericLiteral) ||
         (isHex(cc) && Token.HexadecimalLiteral) ||
         (isPunctuatorChar(ch) && Token.Punctuator) ||
         (isOperator(ch) && Token.Operator);
};

function processToken(tokens, value, line, column) {
  let kind = Token.UNKNOWN;
  if (TokenList[value] >= 0)
    kind = TokenList[value];
  else if (Operators[value] >= 0)
    kind = Operators[value];
  else
    kind = Token["Identifier"];
  let token = createToken(kind, value, line, column-value.length);
  tokens.push(token);

  return token;
};

function createToken(kind, value, line, column) {
  let token = {
    kind: kind,
    value: value,
    line: line,
    column: column
  };
  return (token);
};

// placed here to have correct context to next()
function processOperator(context) {
  const ch = context.ch();
  let second = ch + context.ch(1);
  let third = second + context.ch(2);
  const operator = (isOperator(third) && third) ||
    (isOperator(second) && second) ||
    (isOperator(ch) && ch);

  if (operator) {
    context.next(operator.length);
    processToken(context.tokens, operator, context.line, context.column);
  }
};

function processAlpha(context) {
  return processToken(
    context.tokens,
    context.readWhile(cc => isAlpha(cc) || isNumber(cc)),
    context.line,
    context.column
  );
}

function parseComment(context) {
  if (context.ch() === "/" && context.ch(1) === "/") {
    // TODO: add support for /* */
    while (true) {
      if (context.cc() === 10) {
        context.newLine();
        break;
      }
      context.next();
    };
  }
}

// number [0-9,-0]
function processNumber(context) {
  // hexadecimal
  if (context.ch(1) === "x") {
    context.next();

    return context.tokens.push(
      createToken(
        Token.HexadecimalLiteral,
        context.readWhile(isHex),
        context.line,
        context.column
      )
    );
  }

  return context.tokens.push(
    createToken(
      Token.NumericLiteral,
      context.readWhile(cc => cc === 45 || isNumber(cc)),
      context.line,
      context.column
    )
  );
}

export default function scan(str) {
  const context = new ScannerContext(str);

  while (context.pc < context.length) {
    context.next();

    switch(getType(context)) {
      case Token.EOL:
        context.newLine();
      case Token.Whitespace:
        break;
      case Token.StringLiteral:
        // alphabetical [aA-zZ]
        processAlpha(context);
        break;
      case Token.NumericLiteral:
        processNumber(context);
        break;
      case Token.Punctuator:
        processToken(
          context.tokens,
          context.ch(),
          context.line,
          context.column
        );
        break;
      case Token.Operator:
        processOperator(context);
        break;
      default:
        // comment [//]
        parseComment(context);
    }
  };

  return context.tokens;
};
