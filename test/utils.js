const compile = require('../dist/momo');

const compileWithoutLog = code => compile(code, { log: () => null });

module.exports = (t, tests, results) =>
  Promise.all(tests.map(compileWithoutLog))
  .then(wasms => wasms.map(({ instance: { exports } }, i) => {
      t.is(exports.main(), results[i], `Check ${i} failed`);
    })
  );
