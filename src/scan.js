"use strict";
import { Token, TokenList, Operators } from "./const";

const BLANK = 0;
const QUOTE = 1;
const ALPHA = 2;
const NUMBER = 3;
const HEX = 4;
const PUNCTUATOR = 5;
const OPERATOR = 6;
const EOL = 7;

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

const getType = (ch, cc) => {
  return (isBlank(cc) && BLANK) ||
         (isEOL(cc) && EOL) ||
         (isQuote(cc) && QUOTE) ||
         (isAlpha(cc) && ALPHA) ||
         (isNumber(cc) && NUMBER) ||
         (isHex(cc) && HEX) ||
         (isPunctuatorChar(ch) && PUNCTUATOR) ||
         (isOperator(ch) && OPERATOR);
};

function processToken(tokens, value, line, column) {
  let kind = Token.UNKNOWN;
  if (TokenList[value] >= 0) kind = TokenList[value];
  else if (Operators[value] >= 0) kind = Operators[value];
  else kind = Token["Identifier"];
  let token = createToken(kind, value, line, column-value.length);
  tokens.push(token);
  return (token);
};

// # Scanner #
function createToken(kind, value, line, column) {
  let token = {
    kind: kind,
    value: value,
    line: line,
    column: column
  };
  return (token);
};

export default function scan(str) {
  let ii = -1;
  let line = 1;
  let column = 0;
  let length = str.length;
  let tokens = [];
  let type = null;

  function next(amount = 1) {
    ii += amount;
    column += amount;
  };

  // placed here to have correct context to next()
  function processOperator(ch, idx, line, column) {
    let second = ch + str.charAt(idx + 1);
    let third = second + str.charAt(idx + 2);
    const operator = (isOperator(third) && third) ||
                     (isOperator(second) && second) ||
                     (isOperator(ch) && ch);

    if (operator) {
      next(operator.length);
      processToken(tokens, operator, line, column);
    }
  };

  function processAlpha(cc, start, str) {
    while (true) {
      if (!isAlpha(cc) && !isNumber(cc)) {
        ii--;
        column--;
        break;
      }
      next();
      cc = str.charCodeAt(ii);
    };
    let content = str.slice(start, ii+1);
    processToken(tokens, content, line, column);
  }

  while (ii < length) {
    next();
    let ch = str.charAt(ii);
    let cc = str.charCodeAt(ii);
    type = getType(ch, cc);

    switch(type) {
      case EOL:
        line++;
        column = 0;
      // blank [/s,/n]
      case BLANK:
        break;
      case ALPHA:
        // alphabetical [aA-zZ]
        processAlpha(cc, ii, str);
        break;
      case NUMBER:
        // number [0-9,-0]
        {
          // hexadecimal
          if (str.charAt(ii+1) === "x") {
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
            };
            let content = str.slice(start, ii+1);
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
          };
          let content = str.slice(start, ii+1);
          let token = createToken(Token.NumericLiteral, content, line, column);
          tokens.push(token);
          continue;
        }
      // punctuator [;,(,)]
      case PUNCTUATOR:
        {
          let content = str.slice(ii, ii+1);
          processToken(tokens, content, line, column);
          continue;
        }
      case OPERATOR:
        processOperator(ch, ii, line, column);
        break;
      default:
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
          };
        }
    }
  };

  return tokens;
};
