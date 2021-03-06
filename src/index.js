"use strict";
import parse from "./parse";
import scan from "./scan";
import { emit } from "./emit";
import compiler from "./compiler";

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

const defaultImports = {
  log: console.log,
  error: console.error
};

function compileSource(source, imports) {
  // reset
  compiler.reset(Object.assign({}, defaultImports, imports));

  // process
  let tkns = scan(source);
  let ast = parse(tkns);
  emit(ast);

  return {
    buffer: new Uint8Array(compiler.bytes),
    ast,
    tokens: tkns
  };
}

export default function compile(str, imports = {}, sync) {
  const { buffer, ast } = compileSource(str, imports);
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

// Export internal functions
compile.compileSource = compileSource;
compile.scan = scan;
compile.parse = parse;
compile.emit = emit;

if (typeof window !== "undefined") {
  window.compile = compile;
  window.memoryDump = memoryDump;
}

