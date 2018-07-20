const path = require('path')
const Helpers = require('./helpers')
const rq = require('request-promise-native')
const CacheService = require('../utils/Cache')
const { mockAuth, mockGET } = require('../mock')

class DataFacade {
  constructor (req, res) {
    this.req = req
    this.res = res
    this.auth = req.cookies['jira_auth'] || req.header('Authorization')
    this.services = {}
    this.helpers = new Helpers(req, res)

    this.registerService('issue')
    this.registerService('auth')
    this.registerService('sprint')
  }

  registerService (serviceName) {
    let Service = require(path.resolve(__dirname, `services/${serviceName}.js`))
    const service = new Service()
    service.req = this.req
    service.res = this.res
    service.basicHeaders = this.requestHeaders
    service.helpers = this.helpers
    service.JIRARequest = this.JIRARequest.bind(this)
    this.services[serviceName] = service
  }

  get requestHeaders () {
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.auth) {
      headers['Authorization'] = this.auth
    }
    return headers
  }

  JIRARequest (method, uri, body) {
    const cacheKey = uri

    // ONLY Mock GET
    if (method === 'GET') {
      return mockGET(cacheKey)
    }

    // Mock Auth
    if (uri.endsWith('auth/1/session')) {
      return mockAuth(body)
    }

    if (method === 'GET') {
      const cache = CacheService.getValue('JIRARequest', cacheKey)
      if (cache) {
        console.log('[CACHE] Use cache: ' + cacheKey)
        return Promise.resolve(cache)
      }
    }


    let requestOpts = {
      method,
      uri,
      headers: this.requestHeaders
    }

    if (body) {
      requestOpts.body = body
    }

    return rq(requestOpts)
      .then(data => typeof data === 'string' ? JSON.parse(data) : data)
      .then(data => {
        if (method === 'GET') {
          CacheService.setValue('JIRARequest', cacheKey, data)
        }
        return data
      })
  }

  getData (serviceName, methodName, ...params) {
    return this.services[serviceName][methodName](...params)
  }
}

module.exports = DataFacade;
