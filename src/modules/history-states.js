const env = require('../util/env')

module.exports.main = async function main () {
  if (env.jklm.isHomepage()) {
    const homePageEl = document.querySelector('.page.home')
    const authPageEl = document.querySelector('.page.auth')
    const authButtonEl = document.querySelector('button.auth')

    window.addEventListener('popstate', (e) => {
      authPageEl.hidden = e.state?.page !== 'auth'
      homePageEl.hidden = e.state?.page === 'auth'
    })


    authButtonEl.addEventListener('click', function () {
      if (authPageEl.hidden) {
        history.pushState({ page: 'auth' }, '')
      }
    })
  } else if (env.jklm.isRoom()) {
    const chatPaneEl = document.querySelector('.pane.chat')
    const roomPaneEl = document.querySelector('.pane.room')
    const userProfilePaneEl = document.querySelector('.pane.userProfile')

    const chatTabEl = document.querySelector('.tabs .chat')
    const roomTabEl = document.querySelector('.tabs .room')

    const onClick = function () {
      history.pushState({
        pane: this === roomTabEl ? 'room' : 'chat'
      }, '')
    }

    window.addEventListener('popstate', (e) => {
      chatPaneEl.hidden = e.state?.pane === 'room'
      roomPaneEl.hidden = e.state?.pane !== 'room'
      userProfilePaneEl.hidden = true
    })

    chatTabEl.addEventListener('click', onClick)
    roomTabEl.addEventListener('click', onClick)

    /*
    window.addEventListener('beforeunload', (e) => {
      return e.returnValue = 'You\'re about to exit the room.'
    })
    */
  }
}
