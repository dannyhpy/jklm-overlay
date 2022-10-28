const settings = {}

settings.jklm = {
  getUserToken () {
    return localStorage.getItem('jklmUserToken')
  },

  getSettings () {
    return JSON.parse(
      localStorage.getItem('jklmSettings')
    )
  }
}

module.exports = settings
