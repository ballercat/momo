import test from 'ava';
import runTest from './utils';
import tests from '../test/enum';

test('enum', t => runTest(t, tests));

