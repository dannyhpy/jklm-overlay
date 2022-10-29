const template = document.createElement('template')

template.innerHTML = `
  <div class="chat-input">
    <textarea></textarea>
    <div class="chat-buttons">
      <button class="send">📤</button>
      <button class="boom">💥</button>
    </div>
  </div>
  <div class="chat-footer">
    <div class="char-count">0/0</div>
  </div>

  <style>
    :host {
      --bg-color: #333;
      --bg-hover-color: #444;
      --color: #ccc;
    }

    .chat-input {
      display: flex;
      width: calc(100% - 1rem);
      height: calc(100% - 1.5rem);
      margin: 0.5rem 0.5rem 0 0.5rem;
      border-radius: 1rem;
    }

    textarea {
      flex: 1;
      resize: none;
      padding: 0.5rem;
      font-family: sans-serif;
      font-size: 1rem;
      color: var(--color);
      border: none;
      outline: none;
      border-radius: 1rem 0 0 1rem;
      scrollbar-width: none;
    }

    textarea::-webkit-scrollbar {
      display: none;
    }

    .chat-buttons {
      width: 3rem;
      margin-left: 0.25rem;
      border-radius: 0 1rem 1rem 0;
      display: flex;
      flex-direction: column;
    }

    textarea, .chat-buttons {
      background: var(--bg-color);
      transition: background 0.2s;
    }

    .chat-input:not(.disabled):hover textarea,
    .chat-input:not(.disabled):hover .chat-buttons {
      background: var(--bg-hover-color);
    }

    .chat-buttons button {
      all: unset;
      flex: 1;
      text-align: center;
      border-radius: 0 1rem 1rem 0;
      transition: background 0.2s;
    }

    .chat-buttons button:not(:disabled):hover {
      background: var(--bg-color);
    }

    .chat-buttons button:disabled {
      filter: grayscale(1);
    }

    .chat-footer {
      margin: 0 0.5rem 0.5rem 0.5rem;
    }

    .chat-footer .char-count {
      font-size: 0.75rem;
      padding-right: 0.5rem;
      text-align: right;
      color: var(--color);
    }

    .chat-input.disabled .char-count {
      display: none;
    }
  </style>
`

class ChatInput extends HTMLElement {
  #chatInput
  #textarea
  #charCount
  #sendButton
  #boomButton

  static get observedAttributes () {
    return ['disabled', 'maxlength', 'placeholder', 'disabled-placeholder']
  }

  constructor () {
    super()

    const shadowRoot = this.attachShadow({ mode: 'closed' })

    const templateContent = template.content.cloneNode(true)

    this.#chatInput = templateContent.querySelector('.chat-input')
    this.#textarea = templateContent.querySelector('textarea')
    this.#charCount = templateContent.querySelector('.char-count')
    this.#sendButton = templateContent.querySelector('button.send')
    this.#boomButton = templateContent.querySelector('button.boom')

    this.#textarea.addEventListener('input', () => {
      this.#updateCharCount()
    })

    this.#textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this.submit()
      }
      e.stopPropagation() // Fix //jklm.fun/common/dom.js:8
    })

    this.#sendButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.submit()
    })

    this.#boomButton.addEventListener('click', (e) => {
      e.preventDefault()
      this.#textarea.value = this.#boomButton.textContent
      this.#updateCharCount()
    })

    shadowRoot.append(templateContent)
  }
  
  attributeChangedCallback (name) {
    switch (name) {
      case 'disabled':
        const disabled = this.disabled
        if (disabled) {
          this.#chatInput.classList.add('disabled')
          this.#textarea.value = ''
        } else {
          this.#chatInput.classList.remove('disabled')
        }
        this.#textarea.disabled = disabled
        this.#sendButton.disabled = disabled
        this.#boomButton.disabled = disabled
        this.#updatePlaceholder()
        break

      case 'maxlength':
        this.#textarea.maxLength = this.maxLength
        this.#updateCharCount()
        break

      case 'disabled-placeholder':
      case 'placeholder':
        this.#updatePlaceholder()
        break
    }
  }

  focus () {
    this.#textarea.focus()
  }

  submit () {
    this.dispatchEvent(new CustomEvent('submit', {
      detail: { value: this.#textarea.value }
    }))

    this.#textarea.value = ''
    this.#updateCharCount()
  }

  #updateCharCount () {
    this.#charCount.textContent = `${this.#textarea.value.length}/${this.maxLength}`
  }

  #updatePlaceholder () {
    if (this.disabled) {
      this.#textarea.placeholder = this.disabledPlaceholder ?? 'Chat is disabled.'
    } else {
      if (this.placeholder != null) {
        this.#textarea.placeholder = this.placeholder
      } else {
        this.#textarea.removeAttribute('placeholder')
      }
    }
  }

  get disabled () {
    return this.hasAttribute('disabled')
  }

  set disabled (val) {
    if (val) this.setAttribute('disabled', '')
    else this.removeAttribute('disabled')
  }

  get disabledPlaceholder () {
    return this.getAttribute('disabled-placeholder')
  }

  set disabledPlaceholder (val) {
    return this.setAttribute('disabled-placeholder', val)
  }

  get maxLength () {
    if (this.hasAttribute('maxLength')) {
      return parseInt(this.getAttribute('maxLength'))
    }
  }

  set maxLength (val) {
    if (typeof val === 'number') {
      this.setAttribute('maxLength', val.toString())
    } else if (val == null) {
      this.removeAttribute('maxLength')
    }
  }

  get placeholder () {
    return this.getAttribute('placeholder')
  }

  set placeholder (val) {
    return this.setAttribute('placeholder', val)
  }

  get value () {
    return this.#textarea.value
  }
}

module.exports = ChatInput
