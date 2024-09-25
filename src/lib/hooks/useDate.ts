import { DateTime } from 'luxon'

interface Config {
  toJSDate?: boolean
  plus?: number
  minus?: number
}
export function useDate(date: 'yesterday' | 'today' | 'tomorrow' | Date, config?: Config): DateTime | Date {
  let dateTime: DateTime
  switch (date) {
    case 'today':
      dateTime = DateTime.local().startOf('day')
      break
    case 'tomorrow':
      dateTime = (<DateTime>useDate('today')).plus({ days: 1 })
      break
    case 'yesterday':
      dateTime = (<DateTime>useDate('today')).minus({ days: 1 })
      break
    default:{
      dateTime = DateTime.fromJSDate(date as Date)
      if (config?.minus) {
        dateTime = dateTime.minus({ days: config.minus })
      }
      if (config?.plus) {
        dateTime = dateTime.plus({ days: config.plus })
      }
    }
  }
  return config?.toJSDate ? dateTime.toJSDate() : dateTime
}
