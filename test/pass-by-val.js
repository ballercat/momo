import test from 'ava';

test('pass-by-val', t => {});

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
