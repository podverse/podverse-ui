export { validateEmail, validatePassword } from './validation'

// This checks if we are server-side rendering or rendering on the front-end.
export const checkIfLoadingOnFrontEnd = () => {
  return typeof window !== 'undefined'
}

export const readableDate = (date) => {
  const dateObj = new Date(date),
    year = dateObj.getFullYear(),
    month = dateObj.getMonth() + 1,
    day = dateObj.getDate();

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return month + '/' + day + '/' + year;
}

export const convertSecToHHMMSS = (sec: number) => {
  let totalSec = Math.floor(sec)
  const hours = Math.floor(totalSec / 3600)
  totalSec %= 3600
  const minutes = Math.floor(totalSec / 60)
  const seconds = Math.floor(totalSec % 60)
  let result = ''

  if (hours >= 1) {
    result += hours + ':'
  }

  if (minutes >= 10) {
    result += minutes + ':'
  } else if (minutes >= 1 && hours >= 1) {
    result += '0' + minutes + ':'
  } else if (minutes >= 1) {
    result += minutes + ':'
  } else if (minutes === 0 && hours >= 1) {
    result += '00:'
  }

  if (seconds >= 10) {
    result += seconds
  } else if (seconds >= 1 && minutes >= 1) {
    result += '0' + seconds
  } else if (seconds >= 1) {
    result += seconds
  } else {
    result += '00'
  }

  if (result.length === 2) {
    result = '0:' + result
  }

  if (result.length === 1) {
    result = '0:0' + result
  }

  return result
}

export const getHHMMSSMatchesInString = (str: string) => {
  const regex = /([0-9]?[0-9]:[0-5]?[0-9]:[0-5][0-9])|([0-5]?[0-9]:[0-5][0-9])/g
  return str.match(regex)
}

const createHHMMSSAnchorTag = (hhmmss: string) => {
  const sec = convertHHMMSSToSeconds(hhmmss) || 0
  if (sec || sec === 0) {
    return `<a data-start-time='${sec}'>${hhmmss}</a>`
  } else {
    return ''
  }
}

export const convertHHMMSSToAnchorTags = (html: string) => {
  const matches = getHHMMSSMatchesInString(html) || []
  let formattedHtml = html
  for (const match of matches) {
    const replace = match
    const regex = new RegExp(replace, 'g')
    const anchorTag = createHHMMSSAnchorTag(match)
    formattedHtml = formattedHtml.replace(regex, anchorTag)
  }

  return formattedHtml
}

export function validateHHMMSSString (hhmmss) {
  const regex = new RegExp('^(([0-9][0-9]):([0-5][0-9]):([0-5][0-9]))$|(([0-9]):([0-5][0-9]):([0-5][0-9]))$|^(([0-5][0-9]):([0-5][0-9]))$|^(([0-9]):([0-5][0-9]))$|^([0-5][0-9])$|^([0-9])')
  return regex.test(hhmmss)
}

export function convertHHMMSSToSeconds (hhmmssString) {

  if (hhmmssString) {

    if (!validateHHMMSSString(hhmmssString)) {
      return -1
    }

    const hhmmssArray = hhmmssString.split(':') || 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (hhmmssArray.length === 3) {
      hours = parseInt(hhmmssArray[0])
      minutes = parseInt(hhmmssArray[1])
      seconds = parseInt(hhmmssArray[2])

      if (hours < 0 || minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.')
        return -1
      }
  
      hours = hours * 3600;
      minutes = minutes ? minutes * 60 : 0;
    } else if (hhmmssArray.length === 2) {
      minutes = parseInt(hhmmssArray[0]);
      seconds = parseInt(hhmmssArray[1]);
  
      if (minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.');
        return -1;
      }
  
      minutes = minutes * 60;
      
    } else if (hhmmssArray.length === 1) {
      seconds = parseInt(hhmmssArray[0]) || 0
  
      if (seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.')
        return -1
      }
  
    } else {
      console.log('Invalid time provided.')
      return -1
    }

    return hours + minutes + seconds;

  } else {
    return null
  }

}

export const readableClipTime = (startTime, endTime, t) => {
  const s = convertSecToHHMMSS(startTime)
  if ((startTime || startTime === 0) && endTime) {
    const e = convertSecToHHMMSS(endTime)
    return `${s} - ${e}`
  } else {
    return `${t('Start')}: ${s}`
  }
}

export function calcDuration (startTime, endTime) {
  if (endTime > startTime) {
    return endTime - startTime
  } else {
    return
  }
}

export function secondsToReadableDuration (sec) {
  sec = Number(sec)
  const h = Math.floor(sec / 3600)
  const m = Math.floor(sec % 3600 / 60)
  const s = Math.floor(sec % 3600 % 60)

  const hDisplay = h > 0 ? h + 'h ' : ''
  const mDisplay = m > 0 ? m + 'm ' : ''
  const sDisplay = s > 0 ? s + 's' : ''

  let fullDisplay = hDisplay + mDisplay + sDisplay

  if (fullDisplay.substr(fullDisplay.length - 1) === ' ') {
    fullDisplay = fullDisplay.substr(0, fullDisplay.length - 1)
  }

  return fullDisplay
}

export const clone = obj => {
  if (null == obj || "object" != typeof obj) return obj
  const copy = obj.constructor()
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
  }
  return copy
}

export const generateArrayWithRangeOfIntegers = (start, end) => Array.from(
  { length: (end - start) }, (v, k) => k + start
)

export const safeAlert = (text: string) => {
  if (typeof window !== 'undefined') {
    alert(text)
  }
}

export const getIsAuthorityFeedUrl = (feedUrls: any[]) => {
  const feedUrl = (feedUrls && Array.isArray(feedUrls)) ? feedUrls.find((x: any) => x.isAuthority === true) : {}
  return feedUrl.url ? feedUrl.url : ''
}
