import { SysInfos, URLS } from '@/configs'

const locations = window.location
const port = locations.port
const BaseUrlPrefix = locations.protocol + '//' + locations.hostname + (process.env.NODE_ENV === 'production'? '': ':' + port)

const BASE_URL = (BaseUrlPrefix + (SysInfos['BASE_API_PATH'] || ''))

const defaultOoptions = {
  accepts: 'application/json'
}

$.ajaxSetup(defaultOoptions)

function initRequest (options = {}) {
  return function request (params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      const option = Object.assign({}, defaultOoptions, config)
      $.ajax({
        type: options.type,
        url: BASE_URL + options.url,
        data: params,
        ...option,
        success: function (data) {
          resolve(data)
        },
        error: function (err) {
          reject(err)
        }
      })
    })
  }
}

function generateRequest () {
  const Map = {}
  Object.keys(URLS).forEach(key => {
    Map[key] = initRequest(URLS[key])
  })
  return Map
}

export default generateRequest()
