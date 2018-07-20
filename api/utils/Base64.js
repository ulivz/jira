module.exports = {

  encode(input) {
    if (typeof window !== 'undefined') {
      return window.btoa(input)
    } else {
      return Buffer(input).toString('base64')
    }
  },

  decode(input) {
    if (typeof window !== 'undefined') {
      return window.atob(input)
    } else {
      return Buffer(input, 'base64').toString('ascii')
    }
  }
}
