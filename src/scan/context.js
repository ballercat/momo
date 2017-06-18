
export default  class ScannerContext {
  constructor(source) {
    this.pc = -1;
    this.line = 1;
    this.column = 0;
    this.length = source.length;
    this.tokens = [];
    this.source = source;
  }

  next(amount = 1) {
    this.pc += amount;
    this.column += amount;
  }

  previous(amount = 1) {
    this.pc -= amount;
    this.column -= amount;
  }

  newLine() {
    this.line++;
    this.column = 0;
  }

  read(start, end) {
    return this.source.slice(start, end);
  }

  ch(offset = 0) {
    return this.source.charAt(this.pc + offset);
  }

  cc(offset = 0) {
    return this.source.charCodeAt(this.pc + offset);
  }

  nextWhile(predicate) {
    while (true) {
      if (!predicate(this.cc())) {
        this.previous();
        break;
      }
      this.next();
    };
  }

  readWhile(predicate) {
    let content = this.ch();
    while (true) {
      if (!predicate(this.cc(1)))
        break;
      this.next();
      content += this.ch();
    };
    return content;
  }
}

