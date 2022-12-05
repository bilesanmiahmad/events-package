// import test from 'ava'
// import { createRealMixpanelClient } from '../../../util/client/mixpanel'
import mixpanelIntegration, { conditionallyAddUserAlias, trackEvent, testTrackEvent, conditionallyAddUserToGroup } from './index'
// import config from '../../config'

const mixpanel = require('mixpanel');

// test.beforeEach(t => {
//   const createFakeMixpanelClient = () => ({
//     alias: () => Promise.resolve({ data: { id: '1234' } }),
//     track: () => Promise.resolve({ data: { id: '1234' } }),
//     set_group: () => Promise.resolve({ data: { id: '1234' } })
//   })
//   t.context.mixpanelClient = createRealMixpanelClient({config})
//   t.context.config = config
//   t.context.mixpanelData = {
//     entityId: 'sddemo',
//     senderId: 'simple-dealer-electron',
//     type: '10010-00-19998',
//     name: 'track sample event',
//     metadata: {
//       auth0Id: '1234',
//       integrations: {
//         mixpanel: {
//           userId: 'sddemouser',
//           groupKey: 'sddemoGroup',
//           dealershipId: 'sddemo'
//         }
//       }
//     }
//   }
// })

// test('Check conditionallyAddUserAlias is working', async t => {
//   const { mixpanelData, mixpanelClient } = t.context
//   const res = await conditionallyAddUserAlias({ mixpanelClient })(mixpanelData)
//   t.snapshot(res)
// })

// test('Check trackEvent is working', async t => {
//   const { mixpanelData, mixpanelClient } = t.context
//   const res = await trackEvent({ mixpanelClient })(mixpanelData)
//   t.snapshot(res)
// })

test('Check test trackEvent is working', t => {
  // const { mixpanelData } = t.context
  const mixpanelData = {
    distinct_id: 'PackageTester419',
    name: 'Packager',
    purpose: 'Events Manager'
  }
  const mixpanelClient = mixpanel.init('213c80fb81a8391743e51df15e73ba8e');
  console.log(mixpanelClient);
  const res = mixpanelClient.track('Event Tester', mixpanelData)
  console.log(res);
  // const res = testTrackEvent({ mixpanelClient })(mixpanelData)
  t.snapshot(res)
})

// const Mixpanel = require('mixpanel');

// const mixpanelClient = Mixpanel.init('a197f1dc2315b408f241e9dd737a438e');

// const res = mixpanelClient.track('Packager', {
//     distinct_id: 'Tester001',
//     name: 'Tester',
//     purpose: 'Events Manager'
// });

// console.log(res);

// test('Check conditionallyAddUserToGroup is working', async t => {
//   const { mixpanelData, mixpanelClient } = t.context
//   const res = await conditionallyAddUserToGroup({ mixpanelClient })(mixpanelData)
//   t.snapshot(res)
// })

// test('Check mixpanelIntegration is working', async t => {
//   const { mixpanelData: data, config } = t.context
//   const res = await mixpanelIntegration({ config })({ data, options: {} })
//   t.truthy(res)
// })


const mixpanelData = {
  distinct_id: 'PackageTester419',
  name: 'Packager',
  purpose: 'Events Manager'
}
const mixpanelClient = mixpanel.init('213c80fb81a8391743e51df15e73ba8e');
console.log(mixpanelClient);
const track = trackEvent({ mixpanelClient })(mixpanelData);
// const res = mixpanelClient.track('Event Tester', mixpanelData)
// console.log(res);
