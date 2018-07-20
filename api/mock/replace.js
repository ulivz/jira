const path = require('path')
const fs = require('fs-extra')

const mockSummaries = require('./data/summary.json')

function randomSummry () {
  return mockSummaries[Math.ceil(Math.random() * 100)]
}


const baseDir = path.resolve(__dirname, 'data')
const files = fs.readdirSync(baseDir)

// 'https://jira.xxx.com/secure/viewavatar?size=xsmall&avatarId=15615&avatarType=issuetype'
// https://jira.xxx.com/secure/viewavatar?size=xsmall&avatarId=15603&avatarType=issuetype

const from = `

Gene Wu

`.trim()

const to = `
	
Rax Alan

`.trim()

// https://jira.corp.ebay.com/secure/viewavatar?size=xsmall&avatarId=15615&avatarType=issuetype


function escapeRegExp (str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

const SUMMARY_RE = /"summary":\s".*"/g

function replaceAll (str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

Promise.all(files.map(file => {
  const filepath = path.join(baseDir, file)
  return fs.readFile(filepath, 'utf-8')
    .then(content => {
      content = replaceAll(content, from, to)
      // content = content.replace(SUMMARY_RE, `"summary": "${randomSummry()}"`)
      const json = JSON.parse(content)
      fs.writeFile(filepath, JSON.stringify(json, null, 2), 'utf-8')
    })
    .catch(error => {
      console.log(error)
      console.log(file)
    })
})).then(() => console.log('[OK]'))

