import test from 'ava'
import removeNullNodesFromModel from './remove-null-nodes'

test('test remove null nodes', t => {
  const model = {
    type: 'full',
    stage: 'complete',
    status: 'active',
    source: 'sd',
    isStarred: null,
    meta: {
      bookAppointment: {
        time: null,
        message: null,
        id: '12445'
      }
    },
    dealership: {
      id: '1608551760051000821',
      name: 'sd-demo-dealership'
    }
  }
  const trimmedModel = removeNullNodesFromModel(model)
  t.snapshot(trimmedModel)
})
