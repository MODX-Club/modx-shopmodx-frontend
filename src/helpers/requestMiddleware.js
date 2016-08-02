export default {
  parseXHRResponse: function(responseHandler) {
    return function(err, resp) {
      var status = resp.status
      var statusText = resp.statusText
      var text = resp.text

      if (err && __DEV__) {
        console.warn(err)
      }

      if (status === 200 && statusText === 'OK') {
        resp = JSON.parse(text)
        responseHandler({
          resp: resp
        })
      } else {
        if (__DEV__) {
          console.warn('weird response error')
        }
      }
    }
  }
}
