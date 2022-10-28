module.exports.createCustomChatPane = function createCustomChatPane () {
  const paneTemplate = document.createElement('template')
  paneTemplate.innerHTML = `
    <div class="pane custom-chat" hidden>
      <x-chat class="darkScrollbar"></x-chat>
      <x-chat-input maxlength="300" placeholder="Type here to chat."></x-chat-input>
    </div>
  `

  const paneEl = paneTemplate.content.querySelector('.pane')

  const sidebarEl = document.querySelector('.sidebar')
  sidebarEl.appendChild(paneTemplate.content)

  GM_addStyle(`
    .pane.custom-chat {
      display: flex;
      flex-direction: column;
    }

    .pane.custom-chat x-chat {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 0.25rem;
    }

    .pane.custom-chat x-chat-input {
      height: 6rem;
    }
  `)

  return paneEl
}

module.exports.observeNormalChatPane = function observeNormalChatPane (targetNode, { onVisible }) {

  const mutationObserver = new MutationObserver(function (mutationList) {
    for (const mutation of mutationList) {
      if (mutation.attributeName === 'hidden') {
        if (!targetNode.hidden) onVisible()
      }
    }
  })

  mutationObserver.observe(targetNode, { attributes: true })
}
