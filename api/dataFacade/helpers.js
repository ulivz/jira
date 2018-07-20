const config = require('../config')

class Helpers {
  constructor(req, res) {
    this.endpoints = config.getEndpoints()
    this.urls = config.getUrls()
  }

  /* url
   ========================================================================== */
  get baseUrl() {
    return this.urls.baseUrl
  }

  getBrowseIssueUrl() {
    return this.urls.browseIssueUrl
  }

  get apiBaseUrl() {
    return this.urls.apiBaseUrl
  }

  /* endpoint
   ========================================================================== */
  getAuthUrl() {
    return this.apiBaseUrl + this.endpoints.login
  }

  getSprintListUrl(teamId) {
    return this.apiBaseUrl + `${this.endpoints.sprintList.replace('{teamId}', teamId)}?includeHistoricSprints=false&includeFutureSprints=false`
  }

  getSprintIssueIdsUrl(teamId, sprintId) {
    return this.apiBaseUrl + this.endpoints.sprintIssues + `?rapidViewId=${teamId}&sprintId=${sprintId}`
  }

  getBacklogUrl(teamId) {
    return this.apiBaseUrl + this.endpoints.backlogUrl + `?rapidViewId=${teamId}&selectedProjectKey=ULIVZ`
  }

  getIssueUrl(id) {
    return this.apiBaseUrl + this.endpoints.issue.replace('{id}', id)
  }

  getIssueWithChangelogUrl(id) {
    return this.apiBaseUrl + this.endpoints.issueWithChangelog.replace('{id}', id)
  }

  getSprintReportUrl(teamId, sprintId) {
    return this.apiBaseUrl + this.endpoints.sprintReport.replace('{teamId}', teamId).replace('{sprintId}', sprintId)
  }

}

module.exports = Helpers
