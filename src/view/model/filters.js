/* eslint-disable */
import { STATUS_SEQUENCE_MAP } from './transformer'

/**
 * Filter of only showing my issues
 * @param row
 * @param username
 * @returns {*|boolean|qa|Function}
 */
export function onlyMe(row, username) {
  return (row.assignee && (row.assignee.name === username))
    || (row.qa && (row.qa.name === username))
}

export function recentUpdate(row, interval) {
  const statusMap = row.stampStatusMap
  const days = row.days
  if (interval === 'default') {
    return true
  }
  let daysLen = days.length - 1
  for(let index = daysLen - 1; index >= 0; index--) {
    if (days[index] === row.lastDay) {
      daysLen = index;
      break;
    }
  }
  const lastDayStamp = row.lastDay.key
  let firstDay
  let idx = daysLen - interval
  while (!firstDay) {
    firstDay = days[idx]
    idx ++
  }
  let lastStatus = statusMap[lastDayStamp]
  // Status have changed or WIP
  return (lastStatus !== statusMap[firstDay.key]) || (
    STATUS_SEQUENCE_MAP[lastStatus] <= STATUS_SEQUENCE_MAP['QA Verified'] &&
      STATUS_SEQUENCE_MAP[lastStatus] >= STATUS_SEQUENCE_MAP['In Progress']);
}
