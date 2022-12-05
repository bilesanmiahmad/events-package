import { identity } from '@meltwater/phi'
import Mixpanel from 'mixpanel'

export const createRealMixpanelClient = ({ config }) => {
  const { mixpanel: { auth: { token } } } = config
  return Mixpanel.init(token)
}

export const createFakeMixpanelClient = () => ({ track: identity })

export default ({ config }) => createRealMixpanelClient({ config, environment: 'production' })
