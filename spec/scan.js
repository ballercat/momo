import test from "ava";
import compiler from "../src";
import snapshot from "snap-shot";

const source = `int x = 0;`;

test.only("scanner generates correct ", t => {

  const tokens = compiler.scan(source);
  snapshot(tokens);
});

