import Vue from 'vue'
import store from './store'
import vuetify from './plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'

// 公共组件
import '@/components/commons'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@/styles/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // @ts-expect-error ignore
  vuetify,
  render: h => h(App),
})
