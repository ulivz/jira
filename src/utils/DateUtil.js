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

function getDay(date) {
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

function isWeekend(date) {
  let day = getDay(date).day
  return (day === 0 || day === 6)
}

/**
 * Get display text
 * @param date
 * @returns {string}
 */

function getDisplayText(date) {
  let localeDateString = date.toLocaleDateString('en')
  return localeDateString.slice(0, localeDateString.lastIndexOf('/'))
}

/**
 * Get the all the days between two specified dates
 * @param startDate
 * @param endDate
 * @returns {Array}
 */

function getIntervalsDays(startDate, endDate) {
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

export default {
  getDay,
  isWeekend,
  getIntervalsDays
}
