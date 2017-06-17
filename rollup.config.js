// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
// import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/index.js',
  dest: 'dist/momo.js',
  format: 'umd',
  moduleName: 'momo',
  plugins: [
    eslint(),
    commonjs(),
    babel()
  ],
};

