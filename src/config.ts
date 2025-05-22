// Payload config
export const PAYLOAD_TOKEN_EXPIRATION = 30 // 30 days
export const PAYLOAD_TOKEN_EXPIRATION_IN_SECONDS = PAYLOAD_TOKEN_EXPIRATION * 24 * 60 * 60 // 30 days in seconds
export const PAYLOAD_MAX_LOGIN_ATTEMPTS = 10
export const PAYLOAD_LOCK_TIME = 600000 // 10 minutes in seconds

export const ENV = process.env.NEXT_PUBLIC_ENV
export const isDev = () => ENV === 'development'
export const isStaging = () => ENV === 'staging'
export const isProd = () => ENV === 'production'

export const times = {
  otpWait: {
    get sec() {
      return 120
    },
    get ms() {
      return this.sec * 1000
    },
  },
}
