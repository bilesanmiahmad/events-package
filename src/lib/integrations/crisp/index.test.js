import test from 'ava'
import createContainer from '../../dependency'
import crispEventPayload from '../../../fixtures/data/crisp-integration.json'

test.beforeEach(async t => {
  t.context.depContainer = createContainer()
})

test('Check crisp integration', async t => {
  const { depContainer } = t.context
  const pushToCrisp = depContainer.resolve('pushToCrisp')
  const payload = {
    data: crispEventPayload,
    options: {}
  }
  t.truthy(pushToCrisp)
  const { crisp: { error } } = await pushToCrisp(payload)
  console.log('---eror', error)
  t.falsy(error)
})
