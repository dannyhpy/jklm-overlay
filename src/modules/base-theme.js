const env = require('../util/env')

module.exports.main = async function main () {
  GM_addStyle(`
    :root {
      --primary-background-color: #7855c7;
      --secondary-background-color: #eee;
      --tertiary-background-color: #dddde3;

      --header-color: #164158;
      --primary-color: #fff;
      --secondary-color: #111;

      --primary-button-color: #26aa36;
      --secondary-button-color: #3ba3ff;
    }

    button.styled, input.styled[type=radio] + label {
      color: var(--primary-color);
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

    .box {
      background: var(--primary-color);
      color: var(--secondary-color);
    }

    .box header {
      color: var(--header-color);
    }
  `)

  if (env.jklm.isHomepage()) {
    GM_addStyle(`
      a[href] {
        color: var(--primary-background-color);
      }

      /* Discord member count */
      .links > div > span:nth-child(4) {
        font-size: 0;
      }
      .links > div > span:nth-child(4):after {
        content: '(7801)';
        font-size: 0.7rem;
      }

      body > div.base > div.top > h1 > a {
        color: var(--primary-color);
      }

      body {
        color: var(--secondary-color);
      }

      .base {
        background: var(--tertiary-background-color);
      }

      .publicRooms {
        background: var(--secondary-background-color);
      }

      .top {
        background: var(--primary-background-color);
        color: var(--primary-color);
      }

      .top .setup .auth {
        color: var(--primary-color);
      }

      .gameSelection .name {
        color: var(--secondary-color);
      }
      .gameSelection .description {
        color: var(--secondary-color);
      }
      .gameSelection input[type=radio]:checked + label {
        background: var(--primary-background-color);
      }
      .gameSelection input[type=radio]:checked + label .name {
        color: var(--primary-color);
      }
      .gameSelection input[type=radio]:checked + label .description {
        color: var(--primary-color);
      }
    `)
  } else if (env.jklm.isRoom()) {
    GM_addStyle(`
      .top {
        background: var(--primary-background-color);
        color: var(--primary-color);
      }

      .sidebar .tabs a {
        border-bottom: 0.25rem solid var(--tertiary-background-color);
      }

      .sidebar .tabs a.active {
        border-bottom-color: var(--primary-background-color);
      }
    `)
  }
}
