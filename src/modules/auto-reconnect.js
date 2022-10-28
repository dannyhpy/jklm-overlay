const env = require('../util/env')
const settings = require('../util/settings')

module.exports.main = async function main () {
  if (!env.jklm.isRoom()) return

  const socket = await env.jklm.waitForSocket()

  // Re-enable automatic reconnection
  socket.io.reconnection(true)

  // Break default disconnect function
  const disconnectFn = unsafeWindow.disconnect
  unsafeWindow.disconnect = () => {}

  socket.io.on('reconnect', function () {
    const jklmSettings = settings.jklm.getSettings()

    socket.emit('joinRoom', {
      roomCode: env.jklm.getRoomCode(),
      userToken: settings.jklm.getUserToken(),
      nickname: jklmSettings.nickname,
      auth: jklmSettings.auth,
      picture: jklmSettings.picture,
      language: navigator.language
    }, (roomData) => {
      console.warn('[overlay] Re-connected to room')
      if (typeof socket_joinRoomCallback !== 'undefined') {
        socket_joinRoomCallback(roomData)
      }
    })
  })

  socket.on('disconnect', function () {
    console.warn('[overlay] Disconnected from room')
  })

  socket.on('kicked', function (reason) {
    disconnectFn(reason)
  })
}
