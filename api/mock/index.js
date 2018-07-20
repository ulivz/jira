const manifest = require('./manifest.json')
const accounts = require('./accounts.json')
const fs = require('fs-extra')
const path = require('path')

function mockGET (endpoint) {
  const cacheFile = manifest[endpoint]
  return fs.readFile(path.resolve(process.cwd(), 'api', cacheFile), 'utf-8').then(JSON.parse)
}

function mockAuth (body) {
  const { username, password } = JSON.parse(body)
  const user = accounts.find(account => account.username === username)
  if (user && user.password === password) {
    return Promise.resolve(require('./auth.json'))
  }
  return Promise.reject({
    statusCode: 401
  })
}

module.exports = {
  mockGET,
  mockAuth
}
