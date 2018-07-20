const LRU = require("lru-cache")
const config = require('../config')
const fs = require('fs')
const path = require('path')

// const manifest = require('../mock/manifest.json')

class JIRACache {
  constructor () {
    this.cache = {}

    config.getCacheConfig().forEach(cache => {
      this.prePopulate(cache.name, cache.maxElements, cache.maxAge)
    })
  }

  prePopulate (name, maxConfig, maxAgeConfig) {
    let options =
      {
        max: maxConfig,
        maxAge: maxAgeConfig,
        length: function (n) {
          return n.length
        }
      }
    this.cache[name] = LRU(options)
    this.cache[name].reset()
  }

  getValue (cacheName, cacheKey) {
    console.log(`[Cache] Get ${cacheName} - ${cacheKey}`)
    return this.cache[cacheName].get(cacheKey)
  }

  setValue (cacheName, cacheKey, cacheValue, cacheTimeConfig) {
    console.log(`[Cache] Set ${cacheName} - ${cacheKey}`)

    // try {
    //   const hash = Math.random().toString(16).slice(2)
    //   const filepath = path.resolve(__dirname, '../mock/data/' + hash + '.json')
    //   manifest[cacheKey] = path.relative(process.cwd(), filepath)
    //
    //   fs.writeFileSync(filepath, JSON.stringify(cacheValue), 'utf-8')
    //   fs.writeFileSync(path.resolve(__dirname, '../mock/manifest.json'), JSON.stringify(manifest), 'utf-8')
    // } catch (error) {
    //   console.log(error)
    // }

    if (typeof cacheTimeConfig === 'undefined' || cacheTimeConfig === null) {
      this.cache[cacheName].set(cacheKey, cacheValue)
    } else {
      this.cache[cacheName].set(cacheKey, cacheValue, cacheTimeConfig)
    }
  }
}

module.exports = new JIRACache()
