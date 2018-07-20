const data = require('./data.json')

export function mockGET (uri) {
  return data[uri]
}

export function mockAuth () {

}
