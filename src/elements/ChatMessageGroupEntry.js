const ChatEntry = require('./ChatEntry')

const entryTemplate = document.createElement('template')
const styleTemplate = document.createElement('template')

entryTemplate.innerHTML = `
  <div class="left">
    <div class="picture"><img></div>
  </div>
  <div class="right">
    <div class="author">
      <div class="nickname"></div>
      <div class="roles"></div>
    </div>
    <div class="messages"></div>
  </div>
`

styleTemplate.innerHTML = `
  <style>
    .entry { display: flex; }
    .left { margin-right: 0.5rem; }
    .right { flex: 1; }

    .picture {
      width: 2.5rem;
      height: 2.5rem;
    }
    .picture img {
      background-color: #222;
      border-radius: 50%;
      height: 2.5rem;
    }

    .author { display: flex; }
    .author .nickname {
      color: white;
      min-height: 1rem;
    }
    .author.banned .nickname {
      color: #ffadad;
      text-decoration: line-through;
    }
    .author .roles {
      flex: 1;
      text-align: right;
    }
    .author.banned .roles { display: none; }

    .picture img, .nickname { cursor: pointer; }

    .message {
      white-space: pre-line;
      word-break: break-word;
      animation: fade-in 0.2s;
    }
    .message.deleted { font-size: 0; }
    .message.deleted:before {
      font-size: small;
      content: '(deleted)';
      color: #888;
    }
  </style>
`

class ChatMessageGroupEntry extends ChatEntry {
  #author = null
  #nickname = null
  #roles = null
  #pictureImage = null
  #messages = null

  constructor(profile, base64Picture) {
    super()

    this.profile = profile

    const entryTemplateContent = entryTemplate.content.cloneNode(true)
    const styleTemplateContent = styleTemplate.content.cloneNode(true)

    this.#author = entryTemplateContent.querySelector('.author')

    this.#nickname = entryTemplateContent.querySelector('.author .nickname')
    this.#nickname.textContent = profile.nickname

    this.#roles = entryTemplateContent.querySelector('.author .roles')
    if (typeof badgesByRole !== 'undefined') {
      this.#roles.textContent = profile.roles.map(x => badgesByRole[x].icon).join(' ')
    }

    this.#pictureImage = entryTemplateContent.querySelector('.picture img')
    this.#pictureImage.src = base64Picture
      ? `data:image;base64,${base64Picture}`
      : '/images/auth/guest.png'

    this.#messages = entryTemplateContent.querySelector('.messages')

    // Event listeners
    function onClickOnUser(e) {
      e.preventDefault()
      showUserProfile(profile.peerId)
    }
    this.#nickname.addEventListener('click', onClickOnUser)
    this.#pictureImage.addEventListener('click', onClickOnUser)

    this.entry.append(entryTemplateContent)
    this.shadowRoot.append(styleTemplateContent)
  }

  appendMessgae(content) {
    const message = document.createElement('div')
    message.classList.add('message')
    message.textContent = content
    this.#messages.appendChild(message)
    return {
      delete() {
        message.classList.add('deleted')
      },
      undelete() {
        message.classList.remove('deleted')
      }
    }
  }

  get bannedAuthor () {
    return this.#author.classList.contains('banned')
  }

  set bannedAuthor (val) {
    if (val) this.#author.classList.add('banned')
    else this.#author.classList.remove('banned')
  }
}

module.exports = ChatMessageGroupEntry
