import test from 'ava';
import runTest from './utils';

test('global', t =>
  runTest(
    t,
    [
      `
      int test = 4;
       int main(int a, int b) {
        return (test);
      };`,
      `
      int test = 4;
       int main(int a, int b) {
        test = 8;
        return (test);
      };
      `
    ],
    [4, 8]
  )
);

