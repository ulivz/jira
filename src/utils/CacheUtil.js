/* eslint-disable */

'use strict';

// const CACHE = {}
// window.__CACHE__ = CACHE

let CacheUtil = {

  write(itemName, item, maxAge) {
    // CACHE[itemName] = item
    let cacheOb = {}
    cacheOb.raw = item
    cacheOb.__createTime = Date.now()
    cacheOb.__maxAge = maxAge // day
    localStorage.setItem(itemName, JSON.stringify(cacheOb));
  },

  read(itemName) {
    let cacheOb;
    try {
      cacheOb = JSON.parse(localStorage.getItem(itemName));
    } catch (err) {
      cacheOb = null;
    }
    if (cacheOb && cacheOb.__maxAge) {
      let diff = Date.now() - (cacheOb.__maxAge * 1000 + cacheOb.__createTime)
      if (diff > 0) {
        console.log('Expired cache: ' + itemName)
        this.clear(itemName);
        cacheOb = null
      } else {
        console.log(itemName + ' will be expired after: ' + (-diff) + 'ms')
      }
    }
    return cacheOb && cacheOb.raw || null;
  },

  clear(itemName) {
    localStorage.removeItem(itemName);
  }
};

export default CacheUtil;
