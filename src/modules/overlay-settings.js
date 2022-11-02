const env = require('../util/env')

const template = document.createElement('template')
template.innerHTML = `
  <div class="page overlay-settings" hidden>
    <p>Nothing to see here... for now.</p>
  </div>
`

GM_addStyle(`
  button.overlay-settings {
    margin-left: 0.5rem;
    padding: 0 0.5rem;

    height: 2.25rem;
    line-height: 2.25rem;

    background: rgba(32, 32, 32, 0.2);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0.25rem;
  }

  button.overlay-settings:hover {
    background: rgba(32, 32, 32, 0.3);
  }

  button.overlay-settings:active {
    background: rgba(32, 32, 32, 0.4);
  }
`)

module.exports.main = async function main () {
  if (!env.jklm.isHomepage()) return

  // Page
  document.querySelector('.base').append(template.content)

  // Button
  const settingsBtn = document.createElement('button')
  settingsBtn.classList.add('overlay-settings')
  settingsBtn.textContent = '⚙️'
  settingsBtn.addEventListener('click', function (event) {
    event.preventDefault()
    location.hash = '#overlay-settings'
  })
  document.querySelector('.setup .wrap').appendChild(settingsBtn)
}