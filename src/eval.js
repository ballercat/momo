import { Token, Nodes, TokenList, Operators, getLabelName } from "./const";
import compiler from "./compiler";

export function evalExpression(node) {
  let kind = node.kind;
  switch (kind) {
    case Nodes.BinaryExpression:
      return (evalBinaryExpression(node));
    break;
    case Nodes.Literal:
      return (evalLiteral(node));
    break;
    default:
      compiler.__imports.error(`Unexpected node kind ${getLabelName(kind)}`);
    break;
  };
  return (0);
};

export function evalLiteral(node) {
  let type = node.type;
  switch (type) {
    case Token.NumericLiteral:
    case Token.HexadecimalLiteral:
      return (parseInt(node.value));
    case Token.Identifier:
      return (compiler.scope.resolve(node.value).resolvedValue);
    break;
  };
};

export function evalBinaryExpression(node) {
  let op = node.operator;
  let left = evalExpression(node.left);
  let right = evalExpression(node.right);
  switch (op) {
    case "+": return (left + right);
    case "-": return (left - right);
    case "*": return (left * right);
    case "/": return (left / right);
    case "%": return (left % right);
    case "^": return (left ^ right);
    case "&": return (left & right);
    case "|": return (left | right);
    case "<<": return (left << right);
    case ">>": return (left >> right);
    case "||": return (left || right) | 0;
    case "&&": return (left && right) | 0;
    case "==": return (left == right) | 0;
    case "!=": return (left != right) | 0;
    case "<": return (left < right) | 0;
    case "<=": return (left <= right) | 0;
    case ">": return (left > right) | 0;
    case ">=": return (left >= right) | 0;
  };
};
