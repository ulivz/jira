import {
  parseResponse,
  getBaseUrl,
  getPostOptions
} from './utils'

import accounts from '../../api/mock/accounts.json'
import getHttpBasicAuth from '../../api/utils/basicAuth'

function mockAuth (body) {
  const { username, password } = JSON.parse(body)
  const user = accounts.find(account => account.username === username)
  const mockBlob = new Blob()
  if (user && user.password === password) {
    return Promise.resolve(new Response(mockBlob, {
      status: 200,
      body: Object.assign(
        require('../../api/mock/auth.json'),
        {
          auth: getHttpBasicAuth(username, password),
          username: username
        }
      )
    }))
  }
  return Promise.resolve(new Response(mockBlob, { status: 401 }))
}

export function login (loginBody) {
  // feOnly mode
  if (process.env.APP_MODE === 'feOnly') {
    return mockAuth(JSON.stringify(loginBody))
  }
  return fetch(getBaseUrl() + 'api/auth/login', getPostOptions(loginBody)).then(parseResponse)
}
