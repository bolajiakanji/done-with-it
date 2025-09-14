import en from 'javascript-time-ago/locale/en'
import TimeAgo from 'javascript-time-ago'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

const timeAgo = (stringDate) => {
  TimeAgo.setDefaultLocale(en.locale)
  TimeAgo.addLocale(en)

  const timeAgo = new TimeAgo('en-US')
  const timePassed = new Date(stringDate)
  const date = parseInt(timePassed.getTime())
  const time = timeAgo.format(date, 'mini-minute')
  return time
}

export default timeAgo