import test from 'ava';
import runTest from './utils';

const tests = [
  ` int main() {
    int a = 10;
    int b = 20;
    return (a + b);
  };`,
  ` int main() {
    int a = 10;
    int b = 20;
    a = b * 2;
    return (a);
  };`,
  ` int main() {
    int a = 10;
    int b = a = 20;
    return (a + b);
  };`,
  ` int main() {
    int a = 10;
    int aa = 11;
    int aaa = 12;
    int b = a = 20;
    int c = b = a = aa = aaa = a = 42;
    return (a + aa + aaa + b + c);
  };`,
  ` int main() {
    int a = 10;
    int aa = 11;
    int aaa = 12;
    int b = a = 20;
    int c = 0;
    b = a = aa = aaa = a = 42;
    return (a + aa + aaa + b + c);
  };`
];

const results = [30, 40, 40, 210, 168];

test('assignment', t => runTest(t, tests, results));

export default tests;

