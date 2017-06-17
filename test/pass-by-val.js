import test from 'ava';

const tests = [
  `int test(int h) {
    h++;
    h += 1;
    return (0);
  };
  int main() {
    int g = 123;
    int res = test(g);
    return (g);
  };
  `,
  `123`
];
test('pass-by-val', t => {});

