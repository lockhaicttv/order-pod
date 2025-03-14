interface GenerateSelectOptions {
  labelKey: string
  valueKey: string
  addDataItem?: boolean
  data?: any[]
}
export const generateSelectOptions = (props: GenerateSelectOptions) => {
  const { data = undefined, addDataItem = false, valueKey, labelKey } = props || {}
  if (!data) return []

  return data.map((item) => {
    if (addDataItem) {
      return {
        label: item[`${labelKey}`],
        value: item[`${valueKey}`],
        data: item
      }
    }

    return {
      label: item[`${labelKey}`],
      value: item[`${valueKey}`]
    }
  })
}

export interface Option<T = undefined> {
  label: string
  value: T
}

interface GenerateMultiSelectOptionsProps<T> {
  labelKey: string
  valueKey: string
  data?: T[]
  valueAsObject: boolean
  renderLabel?: (item: T) => string
}

export function generateMultiSelectOptions<T>(
  props: GenerateMultiSelectOptionsProps<T> & { valueAsObject: true }
): Option<T>[]
export function generateMultiSelectOptions<T>(
  props: GenerateMultiSelectOptionsProps<T> & { valueAsObject: false }
): Option<string>[]
export function generateMultiSelectOptions<T>(
  props: GenerateMultiSelectOptionsProps<T>
): Option<string>[] | Option<T>[] {
  const { data = undefined, valueAsObject = false, valueKey, labelKey, renderLabel } = props || {}
  if (!data) return []

  return valueAsObject
    ? (data.map((item) => {
        return {
          label: (renderLabel ? renderLabel(item) : item[`${labelKey}` as keyof typeof item]) as string,
          value: item
        }
      }) as Option<T>[])
    : (data.map((item) => {
        return {
          label: (renderLabel ? renderLabel(item) : item[`${labelKey}` as keyof typeof item]) as string,
          value: item[`${valueKey}` as keyof typeof item] as string
        }
      }) as Option<string>[])
}
