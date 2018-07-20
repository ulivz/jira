import { GETClient } from './utils'

export function getIssue (issueId) {
  return GETClient('api/issue/' + issueId)
}

export function getSprint (teamId) {
  return GETClient('api/sprint/' + teamId)
}
