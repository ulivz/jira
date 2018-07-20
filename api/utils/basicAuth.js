const Base64 = require('./Base64')

module.exports = function getHttpBasicAuth (username, password) {
  const encodeAuthString = Base64.encode(`${username}:${password}`);
  return `Basic ${encodeAuthString}`
}
