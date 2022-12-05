import { flatten, unflatten } from 'flat'
import { reject, compose, isNilOrEmpty } from '@meltwater/phi'

export default payload => {
  return compose(
    unflatten,
    reject(isNilOrEmpty),
    flatten
  )(payload)
}
