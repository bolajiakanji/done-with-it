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
  console.log('date')
  console.log(date, 'mini-minute')
  console.log(Date.now() - date)
  const time = timeAgo.format(date, 'mini-minute')
 // const bolaji = (me) => {
//     const timePassed = new Date(timejs)
//   const date = parseInt(timePassed.getTime())
//   console.log('date')
//   console.log(date)
//   console.log(Date.now() - date)
      //   }
      return time
}

export default timeAgo