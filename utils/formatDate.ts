import dayjs from 'dayjs'

export const DATE_FORMAT = 'DD-MM-YYYY'

export const dateFormat = (date?: string) => {
  return date ? dayjs(date).format(DATE_FORMAT) : '---'
}
