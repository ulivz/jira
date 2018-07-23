/* eslint-disable */

const dayMap = {
  1: 'Mon.',
  2: 'Tue.',
  3: 'Wed.',
  4: 'Thur.',
  5: 'Fri.',
  6: 'Sat.',
  7: 'Sun.'
}

/**
 * Get day
 * @returns {Object} day object
 */

export function getDay(date) {
  let day = date instanceof Date
    ? date.getDay()
    : new Date(date).getDay()
  return {
    day,
    text: dayMap[day]
  }
}

/**
 * Check if a date is weekend
 * @param {Date|Number} date
 */

export function isWeekend(date) {
  let day = getDay(date).day
  return (day === 0 || day === 6)
}

/**
 * Get display text
 * @param date
 * @returns {string}
 */

export function getDisplayText(date) {
  let localeDateString = date.toLocaleDateString('en')
  return localeDateString.slice(0, localeDateString.lastIndexOf('/'))
}

/**
 * Get the all the days between two specified dates
 * @param startDate
 * @param endDate
 * @returns {Array}
 */

export function getIntervalsDays(startDate, endDate) {
  const ONE_DAY = 86400000
  let days = []
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  let startDateStamp = startDate.getTime()
  let endDateStamp = endDate.getTime()

  days.push({
    title: getDisplayText(startDate),
    key: startDateStamp
  })

  let iterator = startDateStamp
  while ((iterator = iterator + ONE_DAY) < endDate) {
    let iteratorDate = new Date(iterator)
    let displayDate = new Date(iterator - ONE_DAY)
    days.push({
      title: getDisplayText(displayDate),
      key: iteratorDate.getTime()
    })
  }

  return days
}


function IS08601DateParser(date) {
  const origParse = Date.parse, numericKeys = [1, 4, 5, 6, 10, 11]
  let timestamp, struct, minutesOffset = 0

  if ((struct = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/.exec(date))) {
    // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
    for (var i = 0, k; (k = numericKeys[i]); ++i) {
      struct[k] = +struct[k] || 0
    }

    // allow undefined days and months
    struct[2] = (+struct[2] || 1) - 1
    struct[3] = +struct[3] || 1

    // allow arbitrary sub-second precision beyond milliseconds
    struct[7] = struct[7] ? +(struct[7] + "00").substr(0, 3) : 0

    // timestamps without timezone identifiers should be considered local time
    if ((struct[8] === undefined || struct[8] === '') && (struct[9] === undefined || struct[9] === '')) {
      timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7])
    } else {
      if (struct[8] !== 'Z' && struct[9] !== undefined) {
        minutesOffset = struct[10] * 60 + struct[11]

        if (struct[9] === '+') {
          minutesOffset = 0 - minutesOffset
        }
      }

      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7])
    }
  } else {
    timestamp = origParse ? origParse(date) : NaN
  }
  return timestamp
}

export function CrossDate(string) {
  const res = new Date(string)
  if (!isNaN(res)) {
    return res
  }
  const timeStamp = IS08601DateParser(string)
  return new Date(timeStamp)
}

export default {
  CrossDate,
  getDay,
  isWeekend,
  getIntervalsDays
}
