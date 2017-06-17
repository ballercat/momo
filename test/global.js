import test from 'ava';

const tests = [
  `
  int test = 4;
   int main(int a, int b) {
    return (test);
  };`,
  `4`,
  `
  int test = 4;
   int main(int a, int b) {
    test = 8;
    return (test);
  };
  `,
  `8`
];
test(t => {});

