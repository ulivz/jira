const config = require('../../config')

const RECENT_SPRINTS_NUMBER = 3

class Sprint {

  /**
   * Get backlog data
   * @param teamId
   * @returns {*}
   */
  getBacklog (teamId) {
    const endpoint = this.helpers.getBacklogUrl(teamId)
    return this.JIRARequest('GET', endpoint)
  }

  /**
   * Since the 'getSprintIssueIds' would return the mess order of data
   * Temporarily use this API to correct to order
   * @param teamId
   * @returns {*|Request|Promise.<TResult>}
   */
  getCurrentSprintIssueIds (teamId) {
    return this.getBacklog(teamId).then(data => {
      const sprints = data.sprints[0]
      return sprints.issuesIds
    })
  }


  getSprintReport (teamId, sprintId) {
    const endpoint = this.helpers.getSprintReportUrl(teamId, sprintId)
    return this.JIRARequest('GET', endpoint)
  }

  /**
   * Get sprint list
   * @param teamId
   * @returns {Promise<string[]>}
   */
  getSprintListByTeamId (teamId) {
    // Only support for DB and Great Wall
    const teams = config.getTeams()
    const team = teams[teamId]
    if (!team) {
      throw Error('Unknown team id: ' + teamId)
    }
    const endpoint = this.helpers.getSprintListUrl(teamId)

    return this.JIRARequest('GET', endpoint).then(data => {
      const { sprints } = data
      return sprints.filter(sprint => sprint.name.indexOf(team.shortcut) !== -1)
    })
  }

  /**
   * Get issues list
   * @param teamId
   * @param sprintId
   * @returns {Promise<string[]>}
   */
  getSprintIssueIds (teamId, sprintId) {
    console.log('teamId = ' + teamId)
    console.log('sprintId = ' + sprintId)
    let endpoint = this.helpers.getSprintIssueIdsUrl(teamId, sprintId)
    return this.JIRARequest('GET', endpoint).then(data => {
      return Object.keys(data.issueToSummary)
    })
  }


  /**
   * Get recent sprint's sprint list, and also set issues for each sprint
   * @param teamId
   * @returns {Promise.<TeamData>}
   */
  getTeamSprints (teamId) {
    let teamSprints
    return this.getSprintListByTeamId(teamId)
      .then(sprints => {
        let sprintLen = sprints.length
        sprints = sprints.slice(sprintLen - RECENT_SPRINTS_NUMBER - 1)
        teamSprints = sprints
        console.log(teamSprints)
        return Promise.all([
          this.getCurrentSprintIssueIds(teamId),
          Promise.all(sprints.map(sprint => this.getSprintIssueIds(teamId, sprint.id).then(issueIds => sprint.issueIds = issueIds))),
          Promise.all(sprints.map(sprint => this.getSprintReport(teamId, sprint.id).then(sprintData => Object.assign(sprint, sprintData.sprint))))
        ])
      })
      .then(([issueIds]) => {
        let activeSprint = teamSprints.find(sprint => sprint.state === 'ACTIVE')
        activeSprint.issueIds = issueIds
        return teamSprints
      })
  }
}

module.exports = Sprint
