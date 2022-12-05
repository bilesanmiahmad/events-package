import test from 'ava'
import config from '.'
import { keys } from '@meltwater/phi'

test('Ensure our config object doesnt change', t => {
  t.snapshot(keys(config))
})
