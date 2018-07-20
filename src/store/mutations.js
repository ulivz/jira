import CookieUtils from '../utils/CookieUtils'

export const STORAGE_KEY = 'todos-vuejs'

const AUTH_COOKIE_NAME = 'jira_auth'
const USERNAME_COOKIE_NAME = 'jira_name'

const USER_NAME = CookieUtils.getCookie(USERNAME_COOKIE_NAME)
const AUTH_COOKIE = CookieUtils.getCookie(AUTH_COOKIE_NAME)

export const state = {
  loggedIn: !!AUTH_COOKIE,
  loginning: false,
  networkAvailable: 0, // -1: inavailable, 0: unknown, 1: available
  username: USER_NAME,
  auth: AUTH_COOKIE,
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
  currentTeamId: 2128
}

export const mutations = {

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
  }
}

export const getters = {
  defaultTeam(state) {
    return state.teams[0]
  }
}
