import test from 'ava';
import runTest from './utils';

const tests = [
  `int add(int a, int b) {
    return (a + b);
  };
  int sub(int a, int b) {
    return (a - b);
  };
   int main() {
    int *func1 = add;
    int *func2 = &add;
    return ((add == &add) && (add != sub) && sub > add);
  };
  `,
  `int add(int a, int b) {
    return (a + b);
  };
   int main() {
    int *func1 = add;
    return (func1(6, 16));
  };`,
  `int add(int a, int b) {
    return (a + b);
  };
   int main() {
    int *func1 = add;
    return (func1(6, 16) == add(6, 16));
  };`
];

const results = [1, 22, 1];

test('function pointers', t => runTest(t, tests, results));

export default tests;

