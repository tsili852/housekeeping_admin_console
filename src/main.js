// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueMq from 'vue-mq'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import VueLocalStorage from 'vue-localstorage';

Vue.use(Vuetify, {
  theme: {
    primary: colors.deepOrange.darken4,
    secondary: colors.indigo.darken2,
    accent: colors.deepOrange.lighten-4,
    info: colors.blue.lighten3,
    warning: colors.amber.lighten2,
    error: colors.red.accent2,
    success: colors.green.lighten2
  }
})

Vue.use(VueLocalStorage)

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  localStorage: {
    miniVariant: {
      type: Boolean
    }
  }
})
