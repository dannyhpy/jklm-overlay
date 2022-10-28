const template = document.createElement('template')

template.innerHTML = `
  <div class="entry">
  </div>

  <style>
    :host {
      --color: #ccc;
      --bg-color: #333;
      --bg-hover-color: #444;
      --font-size: smaller;
    }

    .entry {
      background: var(--bg-color);
      color: var(--color);
      font-size: var(--font-size);
      margin: 0.25rem;
      margin-bottom: 0;
      padding: 0.5rem;
      border-radius: 1rem;
      width: calc(100% - 0.5rem);
      animation: fade-in 0.2s;
      transition: background 0.2s;
    }

    .entry:hover {
      background: var(--bg-hover-color);
    }

    @keyframes fade-in {
      0% { opacity: 0; transform: translateX(-100%) }
      100% { opacity: 1; transform: none }
    }
  </style>
`

class ChatEntry extends HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open'})

    const templateContent = template.content.cloneNode(true)

    this.entry = templateContent.querySelector('.entry')

    this.shadowRoot.append(templateContent)
  }
}

module.exports = ChatEntry
