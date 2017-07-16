// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
    
    browser.expect.element('.toggle-volume').to.not.be.visible

    browser.expect.element('[title=pause]').to.have.attribute('disabled')

    browser.expect.element('[title=stop]').to.have.attribute('disabled')

    browser.expect.element('[title=start]').to.not.have.attribute('disabled')

    browser.click('[title=start]')
      .waitForElementVisible('.toggle-volume', 5000)

    browser.expect.element('[title=pause]').to.not.have.attribute('disabled')

    browser.expect.element('[title=stop]').to.not.have.attribute('disabled')

    browser.expect.element('[title=start]').to.not.have.attribute('disabled')

    browser.end()
  },
  'wait for kitten test': (browser) => {
    browser.url(devServer)
      .waitForElementVisible('#app', 5000)
    
    browser.expect.element('.well.kittens').to.not.be.visible

    browser.click('[title=start]')
      .waitForElementVisible('.well.kittens', 7000)

    browser.expect.element('.well.kittens img')
      .to.have.attribute('src').which.matches(/thecatapi/)
    
    browser.end()
  }
}
