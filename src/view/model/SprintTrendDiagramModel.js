/* eslint-disable */

import { state } from '../../store/mutations'
import { getIssue, getSprint } from '../../fetch/jira'
import { transformSprintData } from './transformer'
import MOCK_SPRINT from './mockdata.json'

let cachedFilters = []
let cachedSorts = []

export default class SprintTrendDiagramModel {
  constructor() {
    this.teamMap = {}
    state.teams.forEach(team => {
      this.teamMap[team.id] = {
        id: team.id,
        name: team.name
      }
    })
    this.activeTeam = null
  }

  static getPlaceholderData() {
    return transformSprintData(MOCK_SPRINT)
  }

  loadSprintIssues(teamId, sprintId) {
    const team = this.teamMap[teamId]
    const sprint = team.sprints.find(sprint => sprint.id === sprintId)
    if (!sprint.issues.length) {
      return Promise.all(sprint.issueIds.map((issueId, index) =>
        getIssue(issueId).then(res => sprint.issues[index] = res.data)
      ))
    }
    return Promise.resolve()
  }

  loadTeamSprints(teamId) {
    const team = this.teamMap[teamId]
    if (!team.sprints) {
      return getSprint(team.id)
        .then((res) => {
          team.sprints = res.data
          team.sprints.forEach(sprint => sprint.issues = sprint.issues || [])
        })
    }
    return Promise.resolve()
  }

  handleSelectTeam(teamId) {
    this.activeTeam = this.teamMap[teamId]
  }

  handleSelectSprint(sprintId) {
    this.activeTeam.activeSprint = this.activeTeam.sprints.find(sprint => sprint.id === sprintId)
  }

  switch(teamId, sprintId) {
    this.handleSelectTeam(teamId)
    return this.loadTeamSprints(teamId)
      .then(() => {
        if (!sprintId) {
          sprintId = this.activeTeam.sprints[this.activeTeam.sprints.length - 1].id
        }
        this.handleSelectSprint(sprintId)
        return this.loadSprintIssues(teamId, sprintId)
      })
      .then(() => transformSprintData(this.activeTeam.activeSprint))
  }

  getTableData({ filterList, sortList } = {}) {

    let result = this.activeTeam.activeSprint.tableData.slice()

    if (filterList) {
      filterList.forEach(filter => {
        let idx = cachedFilters.findIndex(cachedFilter => cachedFilter.fn === filter.fn)
        if (filter.enable) {
          if (idx === -1) {
            cachedFilters.push({
              fn: filter.fn,
              extraParams: filter.extraParams || []
            })
          } else if (cachedFilters[idx].extraParams !== filter.extraParams) {
            cachedFilters[idx].extraParams = filter.extraParams
          }
        } else {
          if (idx !== -1) {
            cachedFilters.splice(idx, 1)
          }
        }
      })
    }

    if (sortList) {
      sortList.forEach(sort => {
        let idx = cachedSorts.findIndex(cachedSort => cachedSort.fn === sort.fn)
        if (sort.enable) {
          if (idx === -1) {
            cachedSorts.push({
              fn: sort.fn,
              extraParams: sort.extraParams || []
            })
          } else if (cachedSorts[idx].extraParams !== sort.extraParams) {
            cachedSorts[idx].extraParams = sort.extraParams
          }
        } else {
          if (idx !== -1) {
            cachedSorts.splice(idx, 1)
          }
        }
      })
    }

    cachedFilters.forEach(cachedFilter => {
      result = result.filter(row => cachedFilter.fn(row, ...cachedFilter.extraParams))
    })

    cachedSorts.forEach(cachedSort => {
      result = result.sort((prev, next) => cachedSort.fn(prev, next, ...cachedSort.extraParams))
    })

    return result
  }

  getColumns() {
    return this.activeTeam.activeSprint.columns
  }

  getActiveSprintId() {
    return this.activeTeam.activeSprint.id
  }

  getActiveTeamId() {
    return this.activeTeam.id
  }

  getSprints() {
    return this.activeTeam.sprints
  }
}
