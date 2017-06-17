const compile = require('../dist/momo');

const compileWithoutLog = code => compile(code, { log: () => null });

module.exports = (t, tests) => {
  const promises = [];
  const results = [];
  for(let i = 0; i < tests.length; i+=2) {
    promises.push(compileWithoutLog(tests[i]));
    results.push(tests[i + 1]);
  }
  return Promise.all(promises)
  .then(wasms => wasms.map(({ instance: { exports } }, i) => {
      // TODO: This works for now... but will be problematic with floats
      const number = !isNaN(parseInt(results[i])) ? parseInt(results[i]) : null;
      t.is(exports.main(), number | results[i], `Check ${i} failed`);
    })
  );
};
