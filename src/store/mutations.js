import CookieUtils from '../utils/CookieUtils'

export const STORAGE_KEY = 'todos-vuejs'

const AUTH_COOKIE_NAME = 'jira_auth'
const USERNAME_COOKIE_NAME = 'jira_name'

const USER_NAME = CookieUtils.getCookie(USERNAME_COOKIE_NAME)
const AUTH_COOKIE = CookieUtils.getCookie(AUTH_COOKIE_NAME)

const RECENT_UPDATED_DAY_OPTIONS = [1, 2, 7, 'default']
const SORT_OPTIONS = [
  { key: 1, text: 'Default' },
  { key: 2, text: 'Status' },
  { key: 3, text: 'Dev' },
  { key: 4, text: 'QA' }
]

export const state = {
  loggedIn: !!AUTH_COOKIE,
  loginning: false,
  networkAvailable: process.env.APP_MODE === 'feOnly' ? 1 : 0, // -1: inavailable, 0: unknown, 1: available
  username: USER_NAME,
  auth: AUTH_COOKIE,
  inputFocused: false,
  teams: [
    {
      name: 'Facebook',
      id: 2128
    },
    {
      name: 'Google',
      id: 1066
    }
  ],

  // Sidebar at mobile
  showSideBar: false,

  // Toolbox at desktop
  showToolbox: true,

  // Current active team id
  currentTeamId: 1066,

  // Current active sprint id
  activeSprintId: null,

  // Current available sprints list
  sprints: [],

  // Whether to show status text
  showStatusText: true,

  // Filters
  onlyMe: false,
  recentUpdatedDayOptions: RECENT_UPDATED_DAY_OPTIONS,
  recentUpdatedDay: RECENT_UPDATED_DAY_OPTIONS[RECENT_UPDATED_DAY_OPTIONS.length - 1],

  // Sorters
  sortOptions: SORT_OPTIONS,
  avtiveSortStrategy: SORT_OPTIONS[0].key
}

export const mutations = {
  focusInput(state) {
    state.inputFocused = true
  },

  blurInput(state) {
    state.inputFocused = false
  },

  loginStart(state) {
    state.loginning = true
  },

  loginSuccess(state, { auth, username }) {
    state.loggedIn = true
    state.loginning = false
    state.username = username
    CookieUtils.setCookie(AUTH_COOKIE_NAME, auth)
    CookieUtils.setCookie(USERNAME_COOKIE_NAME, username)
  },

  loginFail(state) {
    state.loginning = false
  },

  logout(state) {
    state.loggedIn = false
    CookieUtils.deleteCookie(AUTH_COOKIE_NAME)
    CookieUtils.deleteCookie(USERNAME_COOKIE_NAME)
  },

  networkChange(state, code) {
    state.networkAvailable = code
  },

  changeTeam(state, id) {
    state.currentTeamId = id
  },

  setSprints(state, sprints) {
    state.sprints = sprints
  },

  setActiveSprintId(state, id) {
    state.activeSprintId = id
  },

  setShowStatusText(state, isDisplay) {
    state.showStatusText = isDisplay
  },

  setOnlyMe(state, onlyMe) {
    state.onlyMe = onlyMe
  },

  setActiveSortStrategy(state, avtiveSortStrategy) {
    state.avtiveSortStrategy = avtiveSortStrategy
  },

  setRecentUpdatedDay(state, recentUpdatedDay) {
    state.recentUpdatedDay = recentUpdatedDay
  },

  setShowSideBar(state, showSideBar) {
    state.showSideBar = showSideBar
  },

  setShowToolbox(state, showToolbox) {
    state.showToolbox = showToolbox
  }
}

export const getters = {
  defaultTeam(state) {
    return state.teams[0]
  },
  getTeamNameById: state => teamId => state.teams.find(team => team.id === teamId).name
}
