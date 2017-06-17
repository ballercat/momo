"use strict";
import parse from './parse';
import scan from './scan';
import { emit } from './emit';
import compiler from './compiler';

function hexDump(array) {
  let result = Array.from(array).map((v) => {
    return (v.toString(16));
  });
  return (result);
};

function memoryDump(array, limit) {
  let str = "";
  for (let ii = 0; ii < limit; ii += 4) {
    str += ii;
    str += ": ";
    str += array[ii + 0] + ", ";
    str += array[ii + 1] + ", ";
    str += array[ii + 2] + ", ";
    str += array[ii + 3] + " ";
    str += "\n";
  };
  return (str);
};

function loadStdlib() {
  return new Promise((resolve, reject) => {
    fetch("../stdlib/memory.momo").then((resp) => resp.text().then((txt) => {
      resolve(txt);
    }));
  });
};

function compile(str, imports, sync) {
  // reset
  compiler.reset(imports);

  // process
  let tkns = scan(str);
  let ast = parse(tkns);
  emit(ast);
  let buffer = new Uint8Array(compiler.bytes);
  let dump = hexDump(buffer);

  // output
  if (sync === true) {
    let module = new WebAssembly.Module(buffer);
    let instance = new WebAssembly.Instance(module);
    return ({
      ast: ast,
      dump: dump,
      buffer: buffer,
      memory: instance.exports.memory,
      instance: instance,
      exports: instance.exports
    });
  }
  return new Promise((resolve, reject) => {
    WebAssembly.instantiate(buffer).then((result) => {
      let instance = result.instance;
      resolve({
        ast: ast,
        dump: dump,
        buffer: buffer,
        memory: instance.exports.memory,
        instance: instance,
        exports: instance.exports
      });
    });
  });
};

module.exports = compile;

