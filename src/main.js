
// import { composeWith, then } from '@meltwater/phi'
// import createLogger from 'util/logger'
import { trackEvent } from '../src/lib/integrations/mixpanel'

// const log = createLogger('integtrations:index')

// const asyncTap = (prefix) => async (context) => {
//   log(prefix, context.data)
//   return context
// }

const createEventClient = ({ environment = 'test' }) => ({
  mixpanelEvent: trackEvent
})

export default createEventClient
