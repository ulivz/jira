const config = require('../../config')
const getHttpBasicAuth = require('../../utils/basicAuth')

class Auth {
  login (username, password) {
    const endpoint = this.helpers.getAuthUrl()
    const body = JSON.stringify({ username, password })
    return this.JIRARequest('POST', endpoint, body).then(data => {
      data.auth = getHttpBasicAuth(username, password)
      data.username = username
      return data
    })
  }
}

module.exports = Auth
