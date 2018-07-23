/* eslint-disable */

import DateUtil from '../../utils/DateUtil'

const ISSUE_BROWSR_BASE_URL = 'https://jira.xxx.com/browse/'
const NOW = new Date().getTime()

/**
 * Get the status of an issue at a fixed time
 * @param histories
 * @param day
 * @returns {*}
 */
export function getStatus(histories, day) {
  if (day > NOW) {
    return 'Future'
  }
  if (histories.length === 0) {
    return 'Open'
  }
  if (histories.length === 1) {
    let stamp = new Date(histories[0].time).getTime()
    if (day < stamp) {
      return histories[0].change.from
    } else {
      return histories[0].change.to
    }
  }
  for (let i = 0, l = histories.length; i < l - 1; i++) {
    let lh = histories[i]
    let rh = histories[i + 1]
    let lhStamp = new Date(lh.time).getTime()
    let rhStamp = new Date(rh.time).getTime()
    if (day < lhStamp) {
      return lh.change.from
    } else if (day > lhStamp && day < rhStamp) {
      return lh.change.to
    }
    if (day > rhStamp) {
      if (!histories[i + 2]) {
        return rh.change.to
      }
    }
  }
}

/**
 * A map of every day's status
 * @param histories
 * @param days
 * @returns {{}}
 */
function getStausMap(histories, days) {
  let statusMap = {}
  days.forEach(day => {
    statusMap[day.key] = getStatus(histories, day.key)
  })
  return statusMap
}

export const STATUS_SEQUENCE_MAP = {
  "Future": 0,
  "In Analysis": 1,
  "Ready For Development": 2,
  "Open": 3,
  "Reopened": 4,

  "In Progress": 5,
  "Code Review": 6,
  "Ready for QA": 7,
  "In QA Testing": 8,
  "QA Verified": 9,

  "Resolved": 10,
  "Closed": 11,
  "Cannot Reproduce": 12,
  "Won't Fix": 13,
  "Duplicate": 14
}

export function transformSprintData(sprint, {
  isMobile = false
} = {}) {
  if (!sprint.days) {
    let { startDate, endDate } = sprint;

    // To set startDate, endDate to be the same hour/minute/second/ms so that status on last day
    // will always use the latest one.
    let now = new Date(NOW), start = new Date(startDate), end = new Date(endDate);
    start.setHours(now.getHours());
    start.setMinutes(now.getMinutes());
    start.setSeconds(now.getSeconds());
    start.setMilliseconds(now.getMilliseconds());
    end.setHours(now.getHours());
    end.setMinutes(now.getMinutes());
    end.setSeconds(now.getSeconds());
    end.setMilliseconds(now.getMilliseconds());
    startDate = start.getTime();
    endDate = end.getTime();

    // Extend the end date to today
    if (sprint.state === 'ACTIVE' && NOW > new Date(sprint.endDate).getTime()) {
      endDate = NOW
    }

    sprint.days = DateUtil.getIntervalsDays(startDate, endDate)
      .filter(day => !DateUtil.isWeekend(day.key))
  }
  sprint.columns = [
    {
      title: 'ID',
      key: 'id',
      width: isMobile ? 95 : 110,
      className: 'issue-id',
      fixed: 'left',
      render: (h, params) => {
        return h('a', {
          attrs: {
            href: ISSUE_BROWSR_BASE_URL + params.row.id,
            target: '__blank'
          }
        }, params.row.id)
      }
    },      // id
    {
      title: '',
      key: 'type',
      className: 'issue-type',
      fixed: isMobile ? null: 'left',
      width: 50,
      render: (h, params) => {
        return h('img', {
          domProps: {
            src: params.row.issuetype.iconUrl,
            alt: params.row.issuetype.name,
            title: params.row.issuetype.name
          }
        });
      }
    },        // type
    {
      title: '',
      key: 'points',
      className: 'issue-points',
      fixed: isMobile ? null: 'left',
      width: 50,
      render: (h, params) => {
        return h('div', {
          attrs: {
            class: 'badge'
          }
        }, params.row.points);
      }
    },        // point
    {
      title: 'Dev',
      key: 'assignee',
      className: 'issue-assignee',
      fixed: isMobile ? null: 'left',
      width: 54,
      render: (h, params) => {
        return h('img', {
          domProps: {
            src: params.row.assignee.avatarUrl || '',
            alt: params.row.assignee.displayName || '',
            title: params.row.assignee.displayName || ''
          }
        });
      }
    },        // assignee
    {
      title: 'QA',
      key: 'qa',
      className: 'issue-qa',
      fixed: isMobile ? null: 'left',
      width: 54,
      render: (h, params) => {
        return h('img', {
          domProps: {
            src: params.row.qa.avatarUrl || '',
            alt: params.row.qa.displayName || '',
            title: params.row.qa.displayName || ''
          }
        });
      }
    },        // assignee
    {
      title: 'Summary',
      key: 'summary',
      className: 'issue-summary',
      fixed: isMobile ? null: 'left',
      width: 400,
    }, // summary
    ...sprint.days.map(day => {
      day.width = 100
      day.className = 'jira-status-column'
      day.render = (h, params) => {
        const statusName = params.row.stampStatusMap[day.key]
        return h('div', {
          attrs: {
            class: `status-text status-${STATUS_SEQUENCE_MAP[statusName]}`
          },
        }, statusName);
      }
      return day
    })  // days
  ]

  let lastDay;
  for (let day of sprint.days) {
    if (day.key <= NOW) {
      lastDay = day
    } else {
      break;
    }
  }
  if (!lastDay) {
    lastDay = sprint.days[sprint.days.length - 1]
  }

  sprint.tableData = sprint.issues.map(issue => {
    return {
      issuetype: issue.issuetype,
      id: issue.id,
      points: issue.points,
      assignee: issue.assignee,
      qa: issue.qa,
      summary: issue.summary,
      lastDay,
      days: sprint.days,
      stampStatusMap: issue.histories ? getStausMap(issue.histories, sprint.days) : {}
    }
  })

  return sprint
}
