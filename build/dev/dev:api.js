const nodemon = require('nodemon')
const chalk = require('chalk')

function apiDevServer() {
  const info = chalk.bgGreen(chalk.black(' INFO '))
  nodemon(require('../../nodemon.json'))
  nodemon
    .on('start', function () {
      console.log(`\n${info} API Server has started at http://localhost:3000/`)
    })
    .on('quit', function () {
      console.log(`\n${info} API Server has quit`)
      process.exit();
    })
    .on('restart', function (files) {
      console.log(`\n${info} App restarted due to: ${files}`)
    })
}

module.exports = apiDevServer()
