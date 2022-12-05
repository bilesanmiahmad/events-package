import { when, always, path, pathOr, isNotNilOrEmpty, isTrue, split } from '@meltwater/phi'
import flatten from 'flat'
import { success } from 'awaiting'
import { createRealMixpanelClient } from '../../../util/client/mixpanel'

/*
Case 1 Dealership onboarding - create group
 1. Groupkey
 2. Delership Id

Case 2 user signup - add user to group
 Adding a user to a dealership - add user to group
 1. Groupkey
 2. Dealership Id
 3. User id

Case 3 user activities - add track
 1. userId

Case 4 User alias
 1. userId
 2. auth0Id
*/
const tp = split('.')
export default ({ config }) => async ({ data, ...options }) => {
  const mixpanel = path(tp('metadata.integrations.mixpanel.enabled'), data)
  const mixpanelClient = createRealMixpanelClient({ config })
  const groupingEnabled = path(tp('mixpanel.groupingEnabled'), config)
  return when(
    always(mixpanel),
    async () => {
      await conditionallyCreateGroup({ mixpanelClient, groupingEnabled })(data)
      await conditionallyAddUserToGroup({ mixpanelClient })(data)
      await trackEvent({ mixpanelClient })(data)
      await conditionallyAddUserAlias({ mixpanelClient })(data)
      return { ...options, data, mixpanel: { delivered: true } }
    }
  )({ ...options, data })
}

export const conditionallyCreateGroup = ({ mixpanelClient, groupingEnabled }) => async data => {
  const groupKey = path(tp('metadata.integrations.mixpanel.groupKey'), data)
  const dealershipId = path(tp('metadata.integrations.mixpanel.dealershipId'), data)
  return when(
    () => (
      isTrue(groupingEnabled) &&
      isNotNilOrEmpty(groupKey) &&
      isNotNilOrEmpty(dealershipId)),
    () => mixpanelClient.groups.set(groupKey, dealershipId)
  )({})
}
export const conditionallyAddUserToGroup = ({ mixpanelClient }) => async data => {
  const groupKey = path(tp('metadata.integrations.mixpanel.groupKey'), data)
  const dealershipId = path(tp('metadata.integrations.mixpanel.dealershipId'), data)
  const userId = path(tp('metadata.integrations.mixpanel.userId'), data)

  return when(
    () => (isNotNilOrEmpty(groupKey) && isNotNilOrEmpty(dealershipId) && isNotNilOrEmpty(userId)),
    async () => await mixpanelClient.set_group(dealershipId, [userId])
  )({})
}

export const trackEvent = ({ mixpanelClient }) => async data => {
  const { name } = data
  const distinctId = pathOr('sd-default-distinct-id', tp('metadata.integrations.mixpanel.userId'), data)
  const mixpaneldata = flatten(data)
  mixpanelClient.track(name, {
    distinct_id: distinctId,
    ...mixpaneldata
  })
}

export const testTrackEvent = ({ mixpanelClient }) => async data => {
  const { name } = data
  const distinctId = 'Simple-Dealer'
  const mixpaneldata = flatten(data)
  mixpanelClient.track(name, {
    distinct_id: distinctId,
    ...mixpaneldata
  })
}

export const conditionallyAddUserAlias = ({ mixpanelClient }) => async data => {
  const auth0Id = path(tp('metadata.auth0Id'), data)
  const userId = path(tp('metadata.integrations.mixpanel.userId'), data)
  return when(
    () => (isNotNilOrEmpty(auth0Id) && isNotNilOrEmpty(userId)),
    async () => await success(mixpanelClient.alias(userId, auth0Id))
  )({})
}
