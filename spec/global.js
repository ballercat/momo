import test from 'ava';
import runTest from './utils';
import tests from '../test/global';

test('global', t => runTest(t, tests));

