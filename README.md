# JIRA

## Introduction

[JIRA](https://www.atlassian.com/software/jira) Software is the project management tool for agile teams, which is trusted by over 50,000 customers worldwide.

JIRA itself provides a lot of valuable functions，e.g. **Scrum boards**, **Kanban boards**, **Agile reporting** etc. Surely, this project wasn't a duplicated wheel, It implements a small function that JIRA hasn't implemented at present, which I called `"State Report"`。

`"State Report"` stems from the needs of international team cooperation. Suppose there are the following scenes, You are the lead of a multinational technical team. You and your technician are in City A, and your demand side (usually a PM or PD) is in City B, which is 8 time zones away from City A. then you will face a problem —— **How to tell the PM about the latest ticket's progress every day?**. If you use JIRA, you will find that JIRA does not have a page and records a state of ticket at different time points. And then, it's time for the project to come out.

## Policy

The demo data of this project are all from the real production environment, but all data has been confused in order not to violate the policy.

- All avatars are crawled from the nearest [Github Trending](https://github.com/trending)
- All tickets are crawled from [mongodb's JIRA](https://jira.mongodb.org/secure/Dashboard.jspa)
- All names are randomized.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at http://localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## PORT

- Webpack Dev Server: 8081
- Api Server: 3000
