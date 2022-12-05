import test from 'ava'
import formatTimestampToDate from './format-timestamp-to-date'

test('Check format timestamp', t => {
  t.snapshot(formatTimestampToDate(1643929833687))
})
