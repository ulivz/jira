class Config {
  constructor () {
    this.config = require('./config.json');
  }

  getUrls () {
    return this.config.urls
  }

  getEndpoints () {
    return this.config.endpoints
  }

  getTeams () {
    return this.config.teams
  }

  getCacheConfig () {
    return this.config.cache
  }

}

module.exports = new Config()
