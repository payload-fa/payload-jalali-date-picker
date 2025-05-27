'use client'

import { useEffect, useMemo, useState } from 'react'

import { Calendar, type Value, type CalendarProps } from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import locale_fa from 'react-date-object/locales/persian_fa'
import persian from 'react-date-object/calendars/persian'
import weekends from 'react-multi-date-picker/plugins/highlight_weekends'
import DateObject from 'react-date-object'

import './styles.css'

type Props = {
  value: Value
  readOnly: boolean
  disabled: boolean
  hidden: boolean
  setValue: (value: Date) => void
}

export default function CalendarPicker({ value, readOnly, disabled, hidden, setValue }: Props) {
  const [date, setDate] = useState<Value | null>(null)

  const calendarConfig = useMemo(
    () => ({
      locale: locale_fa,
      calendar: persian,
      format: 'MM/DD/YYYY HH:mm:ss',
      plugins: [<TimePicker position="left" />, weekends()],
      readOnly,
      disabled,
    }),
    [],
  ) as CalendarProps

  useEffect(() => {
    if (value) {
      const dt = new Date(value as string)
      setDate(new DateObject({ date: dt, calendar: persian, locale: locale_fa }))
    } else {
      setDate(null)
    }
  }, [value])

  return (
    <Calendar
      {...calendarConfig}
      value={date}
      onChange={(value) => {
        if (readOnly || disabled || hidden) return
        setValue(value?.toDate() as Date)
        setDate(value)
      }}
    />
  )
}
