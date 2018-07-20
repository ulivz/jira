'use strict'
module.exports = {
  APP_MODE: JSON.stringify(process.env.APP_MODE),
  NODE_ENV: '"production"',
  APP_VERSION: JSON.stringify(require('../package.json').version)
}
