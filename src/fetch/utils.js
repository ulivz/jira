import axios from './axios'
import CacheUtil from '../utils/CacheUtil'
import { mockGET } from '../mock/index'

export function getBaseUrl () {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/'
}

export function getRequestHeaders () {
  return {
    'Content-Type': 'application/json'
  }
}

export function getGetOptions () {
  let payload = {
    method: 'GET',
    headers: getRequestHeaders()
  }
  if (process.env.NODE_ENV === 'development') {
    payload.mode = 'cors'
    payload.credentials = 'include'
  } else {
    payload.credentials = 'same-origin'
  }
  return payload
}

export function getPostOptions (body) {
  let payload = {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(body)
  }
  if (process.env.NODE_ENV === 'development') {
    payload.mode = 'cors'
    payload.credentials = 'include'
  } else {
    payload.credentials = 'same-origin'
  }
  return payload
}

export function GETClient (url) {
  // feOnly mode
  if (process.env.APP_MODE === 'feOnly') {
    return Promise.resolve({
      status: 200,
      data: mockGET(url)
    })
  }

  const fullURL = getBaseUrl() + url
  const cacheKey = url
  const data = CacheUtil.read(cacheKey)
  if (data) {
    return Promise.resolve({
      status: 200,
      data
    })
  }
  return axios(fullURL, getGetOptions())
    .then(({ data, status }) => {
      if (status === 200) {
        CacheUtil.write(cacheKey, JSON.parse(JSON.stringify(data)), 1) // Cache 1 minute
      }
      return { data, status }
    })
}

export function parseResponse (response) {
  let status = response.status
  return (status < 500 ? response.json() : response.text()).then(
    responseBody => ({
      status: status,
      body: responseBody
    }))
}
