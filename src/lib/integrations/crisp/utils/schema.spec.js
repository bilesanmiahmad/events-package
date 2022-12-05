import test from 'ava'
import { getSchema } from './schema'

test('Check getSchema', t => {
  t.snapshot(getSchema())
})
