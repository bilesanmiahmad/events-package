import moment from 'moment'

export default (timestamp, format = 'MMMM D, YY') => {
  if (timestamp) {
    const date = new Date(timestamp)
    return moment(date).utc().format(format)
  }
  return null
}
