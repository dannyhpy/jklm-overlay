const ChatEntry = require('./ChatEntry')

const template = document.createElement('template')

template.innerHTML = `
  <div class="chat">
    <slot></slot>
  </div>

  <style>
    .chat {
      display: flex;
      flex-direction: column;
      width: calc(100% - 1rem);
      height: calc(100% - 1rem);
    }

    .chat.disabled { filter: grayscale(1); }
  </style>
`

class Chat extends HTMLElement {
  #chat

  static get observedAttributes () {
    return ['disabled']
  }

  constructor () {
    super()

    this.maxEntryCount = 200

    const shadowRoot = this.attachShadow({ mode: 'closed' })

    const templateContent = template.content.cloneNode(true)

    this.#chat = templateContent.querySelector('.chat')

    shadowRoot.append(templateContent)
  }

  attributeChangedCallback (name) {
    switch (name) {
      case 'disabled':
        if (this.disabled) this.#chat.classList.add('disabled')
        else this.#chat.classList.remove('disabled')
    }
  }

  appendEntry (node) {
    if (node instanceof ChatEntry) {
      if (this.childElementCount >= this.maxEntryCount) {
        this.removeChild(this.firstChild)
      }

      return this.appendChild(node)
    }
  }

  get disabled () {
    return this.hasAttribute('disabled')
  }

  set disabled (val) {
    if (val) this.setAttribute('disabled', '')
    else this.removeAttribute('disabled')
  }
}

module.exports = Chat
