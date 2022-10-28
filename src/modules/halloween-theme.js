const env = require('../util/env')

module.exports.main = async function main () {
  const now = new Date()
  if (now.getMonth() !== 09) return
  if (now.getDate() < 20) return

  GM_addStyle(`
    :root {
      --primary-background-color: #c16525 !important;
      --secondary-background-color: #445061;

      --primary-color: #fff !important;

      --primary-button-color: #c16525 !important;
      --secondary-button-color: #c16525 !important;
    }
  `)

  if (env.jklm.isHomepage()) {
    GM_addStyle(`
      .banner {
        filter: grayscale(1);
      }
    `)
  }
}
