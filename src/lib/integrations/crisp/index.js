import { when, path, split, defaultTo, isNotNilOrEmpty, compose, ensureArray } from '@meltwater/phi'
import formatTimestampToDate from './utils/format-timestamp-to-date'
import removeNullNodes from './utils/remove-null-nodes'
import { Env } from '../../util/constants'

const tp = split('.')
export default ({ crispClient, config, validateCrispPayload }) => async ({ data, ...options }) => {
  const crisp = path(['metadata', 'integrations', 'crisp'], data)
  const validatedCrispPayload = validateCrispPayload(crisp)
  const crispPayload = createCrispPayload(validatedCrispPayload)
  if (config.env !== Env.Production) return { ...options, data }
  return when(
    () => isNotNilOrEmpty(crisp),
    async () => {
      const { people_id: peopleId } = await createProfileIfNotExist({ crispClient, config })(crisp)
      const profile = await createUpdatePeopleProfile({ crispClient, config })(crispPayload, peopleId)
      const customData = await createPushCustomDataToCrisp({ crispClient, config })(crispPayload, peopleId)
      return { ...options, data, crisp: { delivered: true, ...customData, profile } }
    }
  )({ ...options, data })
}

export const createProfileIfNotExist = ({ crispClient, config }) => async payload => {
  const email = path(tp('user.email'), payload)
  const nickName = path(tp('user.name'), payload)
  const getNickName = defaultTo(email, nickName)

  const { crisp: { crispWebsiteId } } = config
  try {
    const crispProfile = await crispClient.website.getPeopleProfile(crispWebsiteId, email)
    return crispProfile
  } catch (error) {
    const profileData = {
      email,
      person: {
        nickname: getNickName
      }
    }
    const crispProfile = await crispClient.website.addNewPeopleProfile(crispWebsiteId, profileData)
    return crispProfile
  }
}

export const createPushCustomDataToCrisp = ({ crispClient, config }) => async (payload, peopleId) => {
  const { crisp: { crispWebsiteId } } = config
  const { customData } = payload
  const peopleData = {
    data: {
      ...customData
    }
  }
  const result = await crispClient.website.updatePeopleData(crispWebsiteId, peopleId, peopleData)
  return result
}

export const createUpdatePeopleProfile = ({ crispClient, config }) => async (payload, peopleId) => {
  const { crisp: { crispWebsiteId } } = config
  const { profile: peopleProfile } = payload

  const result = await crispClient.website.updatePeopleProfile(crispWebsiteId, peopleId, peopleProfile)
  return result
}

export const createCrispPayload = payload => {
  const streetName = path(tp('store.streetName'), payload)
  const streetNumber = path(tp('store.streetNumber'), payload)
  const name = path(tp('store.name'), payload)
  const displayName = path(tp('store.displayName'), payload)
  const companyName = defaultTo(name, displayName)
  const nameKey = path(tp('store.nameKey'), payload)
  const getAddress = () => {
    if (streetName && streetNumber) {
      return `${streetName} ${streetNumber}`
    }
    return null
  }
  const mappedPayload = {
    customData: {
      address_store__state: path(tp('store.state'), payload),
      address_store__postal_code: path(tp('store.zipcode'), payload),
      store__name_key: nameKey,
      store__name_id: path(tp('store.id'), payload),
      store__created_at: compose(formatTimestampToDate, path(tp('store.createdAt')))(payload),
      store__url__privacy_policy: path(tp('store.privacyPolicyUrl'), payload),
      store__credit__form_link: `https://forms.simple-dealer.com/sales/${nameKey}/creditapp`
    },
    profile: {
      email: path(tp('user.email'), payload),
      person: {
        nickname: path(tp('user.name'), payload),
        phone: path(tp('store.phoneNumber'), payload),
        website: path(tp('store.website'), payload),
        address: getAddress(),
        geolocation: {
          city: path(tp('store.city'), payload)
        }
      },
      company: {
        name: companyName,
        legal_name: companyName,
        phones: compose(ensureArray, path(tp('store.phoneNumber')))(payload),
        emails: compose(ensureArray, path(tp('store.email')))(payload),
        geolocation: {
          city: path(tp('store.city'), payload)
        }
      }
    }
  }
  return removeNullNodes(mappedPayload)
}
