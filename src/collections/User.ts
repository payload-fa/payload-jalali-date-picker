import type { CollectionConfig } from 'payload'

import {
  PAYLOAD_MAX_LOGIN_ATTEMPTS,
  PAYLOAD_LOCK_TIME,
  PAYLOAD_TOKEN_EXPIRATION_IN_SECONDS,
} from '@/config'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'کاربر',
    plural: '👥 کاربران',
  },
  auth: {
    loginWithUsername: true,
    tokenExpiration: PAYLOAD_TOKEN_EXPIRATION_IN_SECONDS,
    maxLoginAttempts: PAYLOAD_MAX_LOGIN_ATTEMPTS,
    verify: false, // Require email verification before being allowed to authenticate
    lockTime: PAYLOAD_LOCK_TIME,
    cookies: {
      sameSite: 'Lax',
      secure: true,
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['username', 'name', 'role', 'createdAt'],
    listSearchableFields: ['name', 'role', 'username'],
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام',
      minLength: 1,
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'نقش',
      hasMany: false,
      saveToJWT: true,
      options: [
        {
          label: 'مدیر',
          value: 'admin',
        },
        {
          label: 'کاربر',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],
}
