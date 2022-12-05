
export const getSchema = () => ({
  $id: 'crisp',
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        nickname: { type: 'string' }
      },
      default: {},
      additionalProperties: true,
      required: ['email']
    },
    store: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        nameKey: { type: 'string' },
        displayName: { type: 'string' },
        state: { type: 'string' },
        city: { type: 'string' },
        zipcode: { type: 'string' },
        email: { type: 'string' },
        streetNumber: { type: 'string' },
        streetName: { type: 'string' },
        createdAt: { type: 'number' }
      },
      default: {},
      additionalProperties: true
    }
  },
  additionalProperties: true
})

export default ({
  validateJsonUsingSchema
}) => data => {
  try {
    return validateJsonUsingSchema({ schema: getSchema(), data })
  } catch (error) {
    // send error to slack
  }
}
