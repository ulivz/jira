const config = require('../../config')

/**
 * Parse preson raw data, and only reuturn the necessary data.
 * @param person
 * @returns {*}
 */
function getPerson (person) {
  if (typeof person === 'object' && person !== null) {
    let { name, displayName, timeZone, avatarUrls } = person
    return {
      name,
      displayName,
      timeZone,
      avatarUrl: avatarUrls['48x48']
    }
  }
  return {
    name: '',
    displayName: '',
    timeZone: '',
    avatarUrl: ''
  }
}

/**
 * Build the histories data we need
 * @param histories
 */
function populateHistories (histories) {
  return histories.map(history => {
    if (history.items[0].field === "status") {
      return {
        time: history.created,
        change: {
          from: history.items[0].fromString,
          to: history.items[0].toString
        }
      }
    } else {
      if (history.items[0].field === "resolution") {
        if (history.items[1].field === "status") {
          return {
            time: history.created,
            change: {
              from: history.items[1].fromString,
              to: history.items[1].toString
            }
          }
        }
      }
    }
    return null
  }).filter(history => history !== null)
}

/**
 * Transform issue's metadata
 */
function issueTransformer (issue) {
  const data = issue.fields
  const newData = {
    id: issue.key,
    browseUrl: config.getUrls().browseIssueUrl + issue.key,
    issuetype: data.issuetype,
    summary: data.summary,
    reporter: getPerson(data.reporter),
    creator: getPerson(data.creator),
    assignee: getPerson(data.assignee),
    priority: data.priority.name,
    actaulResult: data.customfield_10351 && data.customfield_10351.replace(/(\r|\n)/g, ' '),
    expectedResult: data.customfield_10351 && data.customfield_10352.replace(/(\r|\n)/g, ' '),
    sites: data.customfield_12669 && data.customfield_12669.map(site => site.value),
    backlog: data.customfield_13754 && data.customfield_13754.value,
    team: data.customfield_13754 && data.customfield_10050.value,
    status: data.status && data.status.name,
    points: data.customfield_10453
  }

  newData.qa = getPerson(data.customfield_16050)

  if (data.customfield_12752) {
    newData.sprint = data.customfield_12752[0]
      .split(',').find(text => text.indexOf('name=') > -1)
      .split('=')[1]
  }

  if (data.parent) {
    const parent = data.parent
    newData.parentJiraUrl = config.getUrls().browseIssueUrl + parent.key
    newData.parentSummary = parent.fields.summary
  }

  if (issue.changelog && Array.isArray(issue.changelog.histories)) {
    newData.histories = populateHistories(issue.changelog.histories)
  }

  return newData
}

class Issue {
  getIssueData (id) {
    let endpoint = this.helpers.getIssueWithChangelogUrl(id)
    return this.JIRARequest('GET', endpoint)
      .then(issueTransformer)
  }
}

module.exports = Issue
