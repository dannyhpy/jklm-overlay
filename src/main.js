const modules = {
  autoReconnect: require('./modules/auto-reconnect'),
  baseTheme: require('./modules/base-theme'),
  customChat: require('./modules/custom-chat/main'),
  halloweenTheme: require('./modules/halloween-theme'),
  historyStates: require('./modules/history-states'),
  pictureMap: require('./modules/picture-map')
}

Promise.all([
  modules.autoReconnect.main(),
  modules.baseTheme.main(),
  modules.customChat.main(),
  modules.halloweenTheme.main(),
  modules.historyStates.main(),
  modules.pictureMap.main()
])
  .then(function () {
    console.warn('Main function exited.')
  })
  .catch(function (err) {
    console.error(err)
  })
