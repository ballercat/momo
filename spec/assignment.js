import test from "ava";
import runTest from "./utils";
import tests from "../test/assignment";

test.skip("assignment", t => runTest(t, tests));
