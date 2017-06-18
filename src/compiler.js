import ByteArray from "./bytes";

class Compiler {
  constructor(imports = null) {
    this.reset(imports);
  }

  reset(imports) {
    this.bytes = new ByteArray();
    this.scope = null;
    this._global = null;
    this.pindex = 0;
    this.tokens = null;
    this.current = null;
    this.__imports = imports;
    this.currentHeapOffset = null;
  }
};

// # compiler syngleton
export default new Compiler();

