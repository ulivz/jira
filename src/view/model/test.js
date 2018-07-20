let histories = [
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

let day = 1511829060000 // 11.28
let day2 = 1511829060000 - 2 * 24 * 60 * 60 * 1000 // 11.26
let day3 = 1511829060000 - 15 * 24 * 60 * 60 * 1000 // 11.13

function getStatus(histories, day) {
  if (histories.length === 0) {
    return 'Open'
  }
  if (histories.length === 1) {
    let stamp = new Date(histories[0].time).getTime()
    if (day < stamp) {
      return histories[0].change.from
    } else {
      return histories[0].change.to
    }
  }
  for (let i = 0, l = histories.length; i < l - 1; i++) {
    let lh = histories[i]
    let rh = histories[i + 1]
    let lhStamp = new Date(lh.time).getTime()
    let rhStamp = new Date(rh.time).getTime()

    if (day < lhStamp) {
      return lh.change.from
    } else if (day > lhStamp && day < rhStamp) {
      return lh.change.to
    }
    if (day > rhStamp) {
      if (!histories[i + 2]) {
        return rh.change.to
      }
    }
  }
}

console.log(getStatus(histories, day))
console.log(getStatus(histories, day2))
console.log(getStatus(histories, day3))
