import moment from 'jalali-moment'
import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatJalaliDate = (date: string) => {
  if (!date) return undefined
  return moment(date).locale('fa').format('dddd D MMMM YYYY, HH:mm')
}
