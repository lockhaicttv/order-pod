export const PRODUCT_SCHEDULE_ROUTE = '/product-schedule'

export const getTimeDetail = (s: string) => {
  const [date, time] = s.split(' ')
  const [day, month, year] = date.split('/')

  return {
    day,
    month,
    year,
    time
  }
}
