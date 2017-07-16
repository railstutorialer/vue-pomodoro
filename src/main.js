// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueNoiseGeneratorPlugin from './plugins/VueNoiseGeneratorPlugin'

Vue.config.productionTip = false

Vue.use(VueNoiseGeneratorPlugin)

Vue.filter('leftpad', (value) => {
    var prefix = value >= 10 ? '' : '0'
    var formattedValue = prefix + value
    return formattedValue
})

Vue.filter('uppercase', (value) => {
  return value.toUpperCase()
})

Vue.filter('addspace', (value) => {
  return value + ' '
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App)
})