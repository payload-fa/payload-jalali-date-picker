import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { fa } from '@payloadcms/translations/languages/fa'

import { Users } from './collections/User'
import { Competition } from './collections/Competition'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: 'default',
    autoLogin:
      process.env.ENABLE_AUTOLOGIN === 'true'
        ? {
            username: process.env.AUTOLOGIN_ADMIN_USERNAME,
            password: process.env.AUTOLOGIN_ADMIN_PASSWORD,
            prefillOnly: true,
          }
        : false,
    meta: {
      titleSuffix: '| پنل ادمین',
      description: 'پنل ادمین',
      icons: [
        {
          rel: 'icon',
          type: 'image/ico',
          url: '/messier.ico',
        },
      ],
      defaultOGImageType: 'off',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'fa',
    supportedLanguages: { fa },
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
  collections: [Users, Competition],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
