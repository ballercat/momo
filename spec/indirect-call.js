import test from 'ava';
import runTest from './utils';
import tests from '../test/indirect-call';

test('if', t => runTest(t, tests));


