const env = require('../util/env')

module.exports.main = async function main () {
  GM_addStyle(`
    :root {
      --primary-background-color: #7855c7;
      --secondary-background-color: #445061;

      --primary-color: #fff;

      --primary-button-color: #26aa36;
      --secondary-button-color: #3ba3ff;
    }

    button.styled, input.styled[type=radio] + label {
      background: var(--primary-button-color);
    }

    button.styled.blue, input.styled[type=radio] + label {
      background: var(--secondary-button-color) ;
    }

    button.styled:not(:disabled):hover, button.styled:not(:disabled):focus {
      background: var(--primary-button-color);
      filter: brightness(1.1);
    }

    button.styled.blue:not(:disabled):hover, button.styled.blue:not(:disabled):focus, input.styled[type=radio]:not(:checked) + label:hover {
      background: var(--secondary-button-color);
      filter: brightness(1.1);
    }

    input.styled[type=radio]:checked + label {
      background: var(--secondary-button-color);
      filter: brightness(0.9);
    }
  `)

  if (env.jklm.isHomepage()) {
    GM_addStyle(`
      a[href] {
        color: var(--primary-background-color);
      }

      body > div.base > div.top > h1 > a {
        color: var(--primary-color);
      }
      
      body {
        background: var(--secondary-background-color);
      }

      .top {
        background: var(--primary-background-color);
        color: var(--primary-color);
      }

      .gameSelection input[type=radio]:checked + label {
        background: var(--primary-background-color);
      }

    `)
  } else if (env.jklm.isRoom()) {
    GM_addStyle(`
      .top {
        background: var(--primary-background-color);
        color: var(--primary-color);
      }

      .sidebar .tabs a {
        border-bottom: 0.25rem solid var(--secondary-background-color);
      }

      .sidebar .tabs a.active {
        border-bottom-color: var(--primary-background-color);
      }
    `)
  }
}
