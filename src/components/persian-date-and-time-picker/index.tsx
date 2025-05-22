'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useField, TextInput } from '@payloadcms/ui'
import type { DateFieldClientComponent, Validate } from 'payload'
import type { Value } from 'react-multi-date-picker'

import { formatJalaliDate } from '@/lib/utils'
import { Loading } from '@/components/loading'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const Picker = dynamic(() => import('./calendar'), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[250px] bg-neutral-800 rounded-md flex items-center justify-center">
      <Loading />
    </div>
  ),
})

const PersianDatePicker: DateFieldClientComponent = ({
  path,
  field,
  validate,
  permissions: permissionsProp,
  readOnly: readOnlyProp,
}) => {
  const [open, setOpen] = useState(false)

  const {
    setValue,
    value,
    disabled: fieldDisabled,
    readOnly: readOnlyField,
    showError,
  } = useField({
    path,
    validate: validate as Validate,
  })

  const permissions = permissionsProp as any

  const canRead = permissions?.read ?? true
  const canUpdate = permissions?.update ?? true
  const canCreate = permissions?.create ?? true

  const inputValue = formatJalaliDate(value as string)

  const label = field.label as string
  const description = field.admin?.description || ''
  const required = Boolean(field.required || field.admin?.disabled)
  const disabled = Boolean(
    fieldDisabled || field.admin?.disabled || !canRead || !canUpdate || !canCreate,
  )
  const hidden = Boolean(field.hidden || field.admin?.hidden || !canRead)
  const placeholder = (field.admin?.placeholder || '') as string
  const readOnly = Boolean(readOnlyProp || readOnlyField || !canRead)

  const handleClear = () => {
    setValue(null)
  }

  return (
    <Popover open={disabled || readOnly || hidden ? false : open} onOpenChange={setOpen}>
      <div hidden={hidden} className="field-type date-time-field" style={{ flex: '1 1 auto' }}>
        <PopoverTrigger asChild disabled={disabled || readOnly || hidden}>
          <div>
            <TextInput
              placeholder={placeholder}
              path={path}
              readOnly={disabled || readOnly}
              value={inputValue || undefined}
              label={label}
              required={required}
              description={description}
              showError={showError}
              rtl={true}
              className="relative persian-date-picker-input"
              AfterInput={
                <div className="z-50 absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span>
                    <CalendarIcon />
                  </span>
                  <button
                    hidden={!value}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleClear()
                    }}
                    className="cursor-pointer"
                  >
                    <XIcon />
                  </button>
                </div>
              }
            />
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent align="start" side="bottom" className="!p-0 pointer-events-auto border-none">
        <Picker
          value={value as Value}
          readOnly={readOnly}
          disabled={disabled}
          hidden={hidden}
          setValue={setValue}
        />
      </PopoverContent>
    </Popover>
  )
}

function CalendarIcon() {
  return (
    <svg
      className="icon icon--calendar !size-[18px]"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{
          stroke: 'var(--theme-elevation-800) !important',
        }}
        d="M7.33333 3.33334V6M12.6667 3.33334V6M4 8.66667H16M5.33333 4.66667H14.6667C15.403 4.66667 16 5.26362 16 6V15.3333C16 16.0697 15.403 16.6667 14.6667 16.6667H5.33333C4.59695 16.6667 4 16.0697 4 15.3333V6C4 5.26362 4.59695 4.66667 5.33333 4.66667Z"
        strokeLinecap="square"
      ></path>
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      className="icon icon--x !size-[20px]"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{
          stroke: 'var(--theme-elevation-800) !important',
        }}
        d="M14 6L6 14M6 6L14 14"
        strokeLinecap="square"
      ></path>
    </svg>
  )
}

export default PersianDatePicker
