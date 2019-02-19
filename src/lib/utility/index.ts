export { validateEmail, validatePassword } from './validation'

export const readableDate = (date) => {
  const dateObj = new Date(date),
    year = dateObj.getFullYear(),
    month = dateObj.getMonth() + 1,
    day = dateObj.getDate();

  var today = new Date();
  var yesterday = new Date(today);
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

export function validateHHMMSSString (hhmmss) {
  const regex = new RegExp('^(([0-9][0-9]):([0-5][0-9]):([0-5][0-9]))$|(([0-9]):([0-5][0-9]):([0-5][0-9]))$|^(([0-5][0-9]):([0-5][0-9]))$|^(([0-9]):([0-5][0-9]))$|^([0-5][0-9])$|^([0-9])')
  return regex.test(hhmmss)
}

export function convertHHMMSSToSeconds (hhmmssString) {

  if (hhmmssString) {

    if (!validateHHMMSSString(hhmmssString)) {
      return -1
    }

    var hhmmssArray = hhmmssString.split(':') || 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    if (hhmmssArray.length === 3) {
      hours = parseInt(hhmmssArray[0])
      minutes = parseInt(hhmmssArray[1])
      seconds = parseInt(hhmmssArray[2])

      if (hours < 0 || minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.')
        return -1
      }
  
      hours = hours * 3600;
      minutes = minutes * 60;
  
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

export const readableClipTime = (startTime, endTime) => {
  let s = convertSecToHHMMSS(startTime)
  if ((startTime || startTime === 0) && endTime) {
    let e = convertSecToHHMMSS(endTime)
    return `${s} to ${e}`
  } else {
    return `Start: ${s}`
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

export const copyToClipboard = (text) => {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const clone = obj => {
  if (null == obj || "object" != typeof obj) return obj
  var copy = obj.constructor()
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
  }
  return copy
}

export const generateArrayWithRangeOfIntegers = (start, end) => Array.from(
  { length: (end - start) }, (v, k) => k + start
)
