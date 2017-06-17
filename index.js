const compile = require('./dist/momo');

const result = compile(
  ` int main() {
    int a = 10;
    int b = 20;
    return (a + b);
  };`
);

console.log(result);
