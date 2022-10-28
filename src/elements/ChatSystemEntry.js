const ChatEntry = require('./ChatEntry')

class ChatSystemEntry extends ChatEntry {
  #textNode

  constructor () {
    super()

    this.#textNode = document.createTextNode('')
    this.entry.append(this.#textNode)
  }

  set textContent (val) {
    this.#textNode.textContent = val
  }
}

module.exports = ChatSystemEntry
