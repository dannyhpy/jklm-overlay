const env = {}

const waitForSocketPromise = new Promise(async (resolve, reject) => {
  for (let i = 0; i < 300; i++) {
    if (
      typeof socket !== 'undefined'
      && socket != null
      && socket.connected
    ) return resolve(socket)

    await new Promise(resolve => setTimeout(resolve, 200))
  }
  reject('Undefined socket')
})

env.jklm = {
  isHomepage () {
    return location.host === 'jklm.fun'
      && location.pathname === '/'
  },

  isRoom () {
    if (location.host !== 'jklm.fun') return false
    if (location.pathname.length !== 5) return false
    if (location.pathname === '/faq/') return false

    return true
  },

  getRoomCode () {
    if (!this.isRoom()) return null

    return location.pathname
      .slice(1)
      .toUpperCase()
  },

  isGame () {
    if (!location.host.endsWith('.jklm.fun')) return false
    if (!location.pathname.startsWith('/games/')) return false

    return true
  },

  getGameName () {
    if (!this.isGame()) return null

    return location.pathname.slice(7)
  },

  waitForSocket () {
    return waitForSocketPromise
  }
}

module.exports = env
