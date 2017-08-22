const _ = require('lodash')
const axios = require('axios')
const qs = require('qs')

// general purpose code to connect to an API
module.exports = function rest(defaults) {

  return (endpoint, data, done) => {
    if (!done && typeof data === 'function') {
      done = data
      data = {}
    }

    // parse endpoint
    let [method, url] = endpoint.split(' ')
    url = defaults.domain + url
    if (method === 'GET') {
      url = url + '?' + qs.stringify(data)
    }

    // compile request options
    const options = _.merge({}, defaults, {method, url, data})
    delete options.domain

    // send request
    const request = axios(options)

    // if done callback, call it
    if (done) {
      request.then(response => done(null, response), error => {

        // add response data and http status code
        error.responseData = error.response.data
        error.statusCode = error.response.status

        // remove circular nested data structures
        delete error.request
        delete error.response

        done(error, {})
      })
    }

    // return promise
    return request
  }
}
