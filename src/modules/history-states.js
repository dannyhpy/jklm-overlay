const env = require('../util/env')

module.exports.main = async function main () {
  if (env.jklm.isHomepage()) {
    const loadingPage = document.querySelector('.page.loading')
    while (!loadingPage.hidden) {
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    const pages = document.querySelectorAll('.page')

    function onHashChange () {
      const pageName = location.hash.slice(1)
      if (pageName === '') return

      for (const page of pages) {
        if (page.classList.contains(pageName)) {
          page.hidden = false
        } else {
          page.hidden = true
        }
      }
    }

    window.addEventListener('hashchange', onHashChange)
    onHashChange()

    const authButton = document.querySelector('button.auth')
    authButton.addEventListener('click', function () {
      location.hash = '#auth'
    })

    const homeButton = document.querySelector('.top > h1 > a[href="/"]')
    homeButton.addEventListener('click', function (event) {
      if (!['', '#home'].includes(location.hash)) {
        event.preventDefault()
        location.hash = '#home'
      }
    })

    const setNicknameButton = document.querySelector('.page.auth form.setNickname button')
    setNicknameButton.addEventListener('click', function () {
      location.hash = '#home'
    })
  } else if (env.jklm.isRoom()) {
    let userPressedLeaveRoomButton = false

    const leaveRoomButton = document.querySelector('.leaveRoom')
    leaveRoomButton.addEventListener('click', function () {
      userPressedLeaveRoomButton = true
      // In case the user does not want to leave the room in the end
      setTimeout(() => { userPressedLeaveRoomButton = false }, 1000)
    })

    window.addEventListener('beforeunload', (e) => {
      if (!userPressedLeaveRoomButton) {
        return e.returnValue = 'You\'re about to exit the room.'
      }
    })
  }
}
