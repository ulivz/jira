/* eslint-disable */

import { STATUS_SEQUENCE_MAP } from './transformer'

/**
 * Sort by Status
 * @param prev
 * @param next
 * @returns {number}
 */
export function sortByStatus(prev, next) {
  let lastDay = prev.lastDay.key
  let prevLastDayStatus = prev.stampStatusMap[lastDay]
  let nextLastDayStatus = next.stampStatusMap[lastDay]
  // Move completed one ahead
  return -(STATUS_SEQUENCE_MAP[prevLastDayStatus] - STATUS_SEQUENCE_MAP[nextLastDayStatus]);
}

/**
 * Sort by QA
 */
const devList = []

export function sortByDev(prev, next) {
  let prevDevName = prev.assignee && prev.assignee.name || 'unknown_dev'
  let nextDevName = prev.assignee && next.assignee.name || 'unknown_dev'
  if (devList.indexOf(prevDevName) === -1) {
    devList.push(prevDevName)
  }
  if (devList.indexOf(nextDevName) === -1) {
    devList.push(nextDevName)
  }
  return devList.indexOf(prevDevName) - devList.indexOf(nextDevName)
}

/**
 * Sort by Dev
 */
const qaList = []

export function sortByQA(prev, next) {
  let prevQAName = prev.qa && prev.qa.name || 'unknown_qa'
  let nextQAName = prev.qa && next.qa.name || 'unknown_qa'
  if (qaList.indexOf(prevQAName) === -1) {
    qaList.push(prevQAName)
  }
  if (qaList.indexOf(nextQAName) === -1) {
    qaList.push(nextQAName)
  }
  return qaList.indexOf(prevQAName) - qaList.indexOf(nextQAName)
}
