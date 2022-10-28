const env = require('../../util/env')
const { pictureMap } = require('../picture-map')

const ChatSystemEntry = require('../../elements/ChatSystemEntry')
const ChatMessageGroupEntry = require('../../elements/ChatMessageGroupEntry')

const entriesByPeerId = []
const messagesByPeerId = []

module.exports.listenToSocketEvents = async function (chat, chatInput) {
  const socket = await env.jklm.waitForSocket()

  let lastGroupEntry = null
  
  function isScrolledToBottom () {
    const scrollBottom = chat.scrollTop + chat.clientHeight
    return scrollBottom > chat.scrollHeight - 100
  }

  function autoScroll () {
    chat.scroll(0, chat.scrollHeight)
  }

  socket.on('chat', (profile, message) => {
    const shouldAutoScroll = isScrolledToBottom()

    if (messagesByPeerId[profile.peerId] == null) {
      messagesByPeerId[profile.peerId] = []
      entriesByPeerId[profile.peerId] = []
    }

    if (lastGroupEntry?.profile.peerId !== profile.peerId) {
      const entry = new ChatMessageGroupEntry(profile, pictureMap.get(profile.peerId))
      lastGroupEntry = entry
      const messageController = entry.appendMessgae(message)
      entriesByPeerId[profile.peerId].push(entry)
      messagesByPeerId[profile.peerId].push(messageController)
      chat.appendEntry(entry)
    } else {
      const messageController = lastGroupEntry.appendMessgae(message)
      messagesByPeerId[profile.peerId].push(messageController)
    }

    if (shouldAutoScroll) autoScroll()
  })

  socket.on('chatterAdded', ({ nickname }) => {
    const shouldAutoScroll = isScrolledToBottom()

    const entry = new ChatSystemEntry()
    lastGroupEntry = null
    entry.style.setProperty('--color', '#acff98')
    entry.textContent = `"${nickname}" joined the room`
    chat.appendEntry(entry)

    if (shouldAutoScroll) autoScroll()
  })

  socket.on('chatterRemoved', ({ nickname }) => {
    const shouldAutoScroll = isScrolledToBottom()

    const entry = new ChatSystemEntry()
    lastGroupEntry = null
    entry.style.setProperty('--color', '#ff9d98')
    entry.textContent = `"${nickname}" left the room`
    chat.appendEntry(entry)

    if (shouldAutoScroll) autoScroll()
  })

  socket.on('setChatMode', (mode) => {
    const shouldAutoScroll = isScrolledToBottom()

    const isGuest = typeof settings === 'undefined' || settings.auth == null
    const isStaff = typeof selfRoles !== 'undefined' && (selfRoles.includes('staff') || selfRoles.includes('creator'))

    let entryTextContent = ''

    switch (mode) {
      case 'noGuests':
        chat.disabled = isGuest
        chatInput.disabled = isGuest
        entryTextContent = 'Chat is now disabled for guests.'
        break
      case 'enabled':
        chat.disabled = false
        chatInput.disabled = false
        entryTextContent = 'Chat is now enabled.'
        break
      case 'disabled':
        chat.disabled = !isStaff
        chatInput.disabled = !isStaff
        entryTextContent = 'Chat is now disabled.'
        break
    }

    const entry = new ChatSystemEntry()
    lastGroupEntry = null
    entry.textContent = entryTextContent
    chat.appendEntry(entry)

    if (shouldAutoScroll) autoScroll()
  })

  socket.on('setRoomPublic', (isPublic) => {
    const shouldAutoScroll = isScrolledToBottom()

    const entry = new ChatSystemEntry()
    lastGroupEntry = null
    entry.textContent = isPublic
      ? '🌎 The room is now public.'
      : '🔒 The room is now private.'
    chat.appendEntry(entry)

    if (shouldAutoScroll) autoScroll()
  })

  socket.on('userBanned', ({ peerId }) => {
    if (entriesByPeerId[peerId] == null) return

    for (const entry of entriesByPeerId[peerId]) {
      entry.bannedAuthor = true
    }

    for (const msg of messagesByPeerId[peerId]) {
      msg.delete()
    }
  })
}
