module.exports = [
  ` int main() {
    int a = 5;
    while (a < 100) {
      a = a + 3;
    };
    return (a);
  };`,
  `101`,
  ` int main() {
    int a = 5;
    while (1 == 0) {
      a = a + 3;
    };
    return (a);
  };`,
  `5`,
  ` int main(int a, int b) {
    int c = a + b;
    while (c < 75) {
      int d = 42;
      while (c < 100) {
        c += d;
        if (c >= 100) {
          int e = d * 2;
          if (1 == 1) {
            c = e * 2;
            break;
          }
        }
      };
    };
    return (c);
  };`,
  `168`,
  ` int main(int a, int b) {
    int c = a + b;
    while (1) {
      c += 1;
      if (c >= 100) { if (1 == 1) { c = 42; break; } }
    };
    return (c);
  };`,
  `42`
];
