const env = require('../../util/env')

const {
  createCustomChatPane,
  observeNormalChatPane
} = require('./pane')

const { listenToSocketEvents} = require('./socket-listeners')

const Chat = require('../../elements/Chat')
const ChatInput = require('../../elements/ChatInput')
const ChatMessageGroupEntry = require('../../elements/ChatMessageGroupEntry')
const ChatSystemEntry = require('../../elements/ChatSystemEntry')

module.exports.main = async function main () {
  if (!env.jklm.isRoom()) return

  // Define custom elements
  customElements.define('x-chat', Chat)
  customElements.define('x-chat-input', ChatInput)
  customElements.define('x-chat-message-group-entry', ChatMessageGroupEntry)
  customElements.define('x-chat-system-entry', ChatSystemEntry)

  const normalChatPane = document.querySelector('.pane.chat')
  const customChatPane = createCustomChatPane()

  const chat = customChatPane.querySelector('x-chat')
  const chatInput = customChatPane.querySelector('x-chat-input')

  chatInput.addEventListener('submit', (e) => {
    if (typeof socket !== 'undefined' && socket != null) {
      socket.emit('chat', e.detail.value)
    }
  })

  observeNormalChatPane(normalChatPane, {
    onVisible () {
      normalChatPane.hidden = true
      customChatPane.hidden = false
    }
  })

  if (!normalChatPane.hidden) {
    normalChatPane.hidden = true
    customChatPane.hidden = false
  }

  unsafeWindow.addEventListener('message', (event) => {
    if (event.data.name !== 'focusChat') return
    event.stopPropagation()
    chatInput.focus()
  }, false)

  await listenToSocketEvents(chat, chatInput)
}
