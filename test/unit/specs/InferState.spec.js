/* eslint-disable */

import { getStatus } from '../../../src/view/model/transformer'

const histories = [
  {
    "time": "2017-11-06T09:59:01.000+0100",
    "change": {
      "from": "Open",
      "to": "In Progress"
    }
  },
  {
    "time": "2017-11-14T10:01:11.000+0100",
    "change": {
      "from": "In Progress",
      "to": "Code Review"
    }
  },
  {
    "time": "2017-11-16T11:15:43.000+0100",
    "change": {
      "from": "Code Review",
      "to": "In QA Testing"
    }
  },
  {
    "time": "2017-11-27T12:09:23.000+0100",
    "change": {
      "from": "In QA Testing",
      "to": "Resolved"
    }
  }
]

describe('Infer ticket\'s state', () => {
  it('Should infer ticket\'s state correctly', () => {
    const day1 = 1511829060000 // 11.28
    const day2 = 1511829060000 - 2 * 24 * 60 * 60 * 1000 // 11.26
    const day3 = 1511829060000 - 15 * 24 * 60 * 60 * 1000 // 11.13
    expect(getStatus(histories, day1)).toBe('Resolved')
    expect(getStatus(histories, day2)).toBe('In QA Testing')
    expect(getStatus(histories, day3)).toBe('In Progress')
  })
})

