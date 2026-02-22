import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru' // русский язык
import 'dayjs/locale/uk' // русский язык


export const getRelativeTime = (createdAt: string | Date, lang:string) => {
    dayjs.extend(relativeTime)
    if(lang === 'ru') {
      dayjs.locale('ru')
    } else {
      dayjs.locale('uk')
    }

  return dayjs(createdAt).fromNow()
}


