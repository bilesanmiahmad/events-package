import { equals, defaultTo } from '@meltwater/phi'
import { config as loadEnvVariablesIntoConfig } from 'dotenv'

const defaultRegion = 'us-east-2'
const eventTopicArnTemplate = 'arn:aws:sns:{{awsRegion}}:{{awsAccountId}}:{{env}}{{eventName}}'
const defaultSubscriptionConfirmationEndpoint = 'https://event-service.simple-dealer.com/sns/subscription/confirm'
const testSlackWebhook = 'https://hooks.slack.com/services/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'

loadEnvVariablesIntoConfig({ path: '.env.local' })

const env = process.env.ENV

let envPrefix = `${env}-`
let envSuffix = 'co'

if (env === 'production') {
  envPrefix = ''
  envSuffix = 'com'
}

export default {
  env: defaultTo('test', process.env.ENV),
  debug: process.env.DEBUG,
  globalEnvironment: 'production',
  productionCluster: defaultTo('', process.env.PRODUCTION_CLUSTER),
  domain: process.env.DOMAIN,
  routeKey: process.env.ROUTE_KEY,
  aws: {
    auth: {
      endpoint: process.env.AWS_AUTH_ENDPOINT,
      accessKeyId: process.env.AWS_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion, process.env.AWS_AUTH_REGION)
    },
    certificateArn: process.env.AWS_CERTIFICATE_ARN,
    certificateName: process.env.AWS_CERTIFICATE_NAME,
    prodDomainName: process.env.DOMAIN,
    testDomainName: process.env.TEST_DOMAIN
  },
  cloudflare: {
    APIToken: process.env.CLOUDFLARE_TOKEN,
    zoneId: process.env.CLOUDFLARE_ZONE_ID,
    url: process.env.ClOUDFLARE_URL
  },
  dynamodb: {
    auth: {
      accessKeyId: process.env.AWS_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion)(process.env.AWS_AUTH_REGION)
    },
    eventTableName: process.env.DYNAMODB_TABLE_NAME,
    eventTableArn: process.env.DYNAMODB_EVENT_SERVICE_TABLE_ARN
  },
  jwtVerificationSecret: defaultTo('1234567890', process.env.JWT_VERIFICATION_SECRET),
  httpClients: {
    bareHttp: {},
    intercom: {
      baseURL: process.env.INTERCOM_ENDPOINT,
      responseType: 'json',
      retries: 3,
      headers: {
        Authorization: process.env.INTERCOM_ACCESS_TOKEN
      }
    },
    statuspage: {
      baseURL: process.env.STATUSPAGE_ENDPOINT,
      responseType: 'json',
      retries: 3,
      headers: {
        Authorization: process.env.STATUSPAGE_AUTH
      }
    },
    authService: {
      endpoint: `https://${envPrefix}event-service.simple-dealer.${envSuffix}`,
      retries: 3
    }
  },
  s3: {
    auth: {
      accessKeyId: process.env.AWS_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion)(process.env.AWS_AUTH_REGION)
    },
    s3ForcePathStyle: equals('true', process.env.S3_FORCE_PATH_STYLE),
    bucket: defaultTo('event-service-data-test', process.env.S3_BUCKET_NAME)
  },
  sns: {
    auth: {
      accountId: process.env.AWS_AUTH_ACCOUNT_ID,
      endpoint: process.env.SNS_AUTH_ENDPOINT,
      accessKeyId: process.env.AWS_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion)(process.env.AWS_AUTH_REGION)
    },
    subscriptionConfirmationEndpoint: defaultTo(defaultSubscriptionConfirmationEndpoint, process.env.SNS_SUBSCRIPTION_CONFIRMATION_ENDPOINT),
    eventTopicArnTemplate: defaultTo(eventTopicArnTemplate, process.env.SNS_EVENT_TOPIC_ARN_TEMPLATE),
    scopeName: defaultTo('', process.env.SNS_EVENT_SCOPE_NAME),
    developmentArn: process.env.SNS_DEVELOPMENT_ARN
  },
  ssm: {
    auth: {
      endpoint: process.env.SSM_AUTH_ENDPOINT,
      accessKeyId: process.env.AWS_AUTH_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_AUTH_SECRET_ACCESS_KEY,
      region: defaultTo(defaultRegion, process.env.AWS_AUTH_REGION)
    },
    prefix: '/simple-dealer/event-service'
  },
  segment: {
    auth: {
      writeKey: process.env.SEGMENT_AUTH_WRITE_KEY
    }
  },
  mixpanel: {
    auth: {
      token: '213c80fb81a8391743e51df15e73ba8e'
    },
    groupingEnabled: equals('true', process.env.MIXPANEL_GROUPING_ENABLED)
  },
  crisp: {
    crispWebsiteId: process.env.CRISP_WEBSITE_ID,
    crispIdentifier: process.env.CRISP_TOKEN_IDENTIFIER,
    crispKey: process.env.CRISP_TOKEN_KEY
  },
  report: {
    sentry: {
      dsn: process.env.REPORT_SENTRY_DSN
    }
  },
  statuspage: {
    auth: process.env.STATUSPAGE_AUTH,
    endpoint: process.env.STATUSPAGE_ENDPOINT,
    pageId: process.env.STATUSPAGE_PAGE_ID
  },
  slack: {
    testWebhook: testSlackWebhook
  }
}
