const env = require('../util/env')

/** @type {Map<number, string>} */
const pictureMap = new Map()
module.exports.pictureMap = pictureMap

module.exports.main = async function main () {
  if (!env.jklm.isRoom()) return

  const socket = await env.jklm.waitForSocket()

  let latestPlayerCount = 0

  function updatePictureMap () {
    socket.emit('getChatterProfiles', (profiles) => {
      pictureMap.clear()
      for (const profile of profiles) {
        pictureMap.set(profile.peerId, profile.picture)
      }
    })
  }

  socket.on('setPlayerCount', (playerCount) => {
    latestPlayerCount = playerCount
    if (playerCount < latestPlayerCount) return

    updatePictureMap()
  })

  updatePictureMap()
}
