
import { composeWith, then } from '@meltwater/phi'
import createLogger from 'util/logger'

const log = createLogger('integtrations:index')

const asyncTap = (prefix) => async (context) => {
  log(prefix, context.data)
  return context
}

export default ({
  pushToMixpanel,
  validateEventConfiguration,
//   pushToSegment,
//   pushToSentry,
//   pushToSlack,
//   pushToStatuspage,
//   pushToCrisp
}) => composeWith(then)([
//   pushToCrisp,
//   pushToStatuspage,
  pushToMixpanel,
  asyncTap('Before pushing to mixpanel'),
//   pushToSlack,
//   asyncTap('Before pushing to slack'),
//   pushToSentry,
//   pushToSegment,
  validateEventConfiguration
])
