const env = require('../util/env')

module.exports.main = async function main () {
  if (env.jklm.isHomepage()) {
    const pages = document.querySelectorAll('.pages')

    function onHashChange () {
      const pageName = location.hash.slice(1)
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
    window.addEventListener('beforeunload', (e) => {
      return e.returnValue = 'You\'re about to exit the room.'
    })
  }
}
