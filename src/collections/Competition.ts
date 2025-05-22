import { CollectionConfig } from 'payload'

export const Competition: CollectionConfig = {
  slug: 'competitions',
  labels: {
    singular: 'مسابقه',
    plural: '⚔️ مسابقات',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'startDate', 'endDate'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'عنوان مسابقه',
      required: true,
    },
    {
      name: 'registerStartDate',
      label: 'تاریخ شروع ثبت نام',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        components: {
          Field: '@/components/persian-date-and-time-picker#default',
        },
      },
    },
    {
      name: 'registerEndDate',
      label: 'تاریخ پایان ثبت نام',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        components: {
          Field: '@/components/jalali-date-and-time-picker#default',
        },
      },
    },
    {
      name: 'startDate',
      label: 'تاریخ شروع مسابقه',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        components: {
          Field: '@/components/jalali-date-and-time-picker#default',
        },
      },
    },
    {
      name: 'endDate',
      label: 'تاریخ پایان مسابقه',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        components: {
          Field: '@/components/jalali-date-and-time-picker#default',
        },
      },
    },
    {
      name: 'players',
      label: 'بازیکنان',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
}
