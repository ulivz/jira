import {
  parseResponse,
  getBaseUrl,
  getPostOptions
} from './utils'

export function login (loginBody) {
  return fetch(getBaseUrl() + 'api/auth/login', getPostOptions(loginBody)).then(parseResponse)
}
