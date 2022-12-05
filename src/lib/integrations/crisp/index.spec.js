import test from 'ava'
import config from '../../config'
import createSetupCrisp, {
  createPushCustomDataToCrisp,
  createCrispPayload,
  createProfileIfNotExist,
  createUpdatePeopleProfile
} from './index'

test('Check crisp client', t => {
  t.truthy(createSetupCrisp({}))
  t.truthy(createPushCustomDataToCrisp({}))
  t.truthy(createCrispPayload({}))
  t.truthy(createProfileIfNotExist({}))
  t.truthy(createUpdatePeopleProfile({}))
})

test('Check createSetupCrisp', async t => {
  const setupCrisp = createSetupCrisp({
    crispClient: () => ({}),
    config,
    validateCrispPayload: () => ({})
  })

  const crisp = {
    integrations: {
      metadata: { }
    }
  }
  const results = await setupCrisp({
    data: { crisp }
  })

  t.truthy(results)
})
