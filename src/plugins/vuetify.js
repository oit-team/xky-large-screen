import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import nativeMeasurable from 'vuetify/lib/mixins/measurable'
import zhHans from 'vuetify/lib/locale/zh-Hans'
import Measurable from '@/mixins/Measurable'

/**
 * 覆写vuetify的measurable mixin，使其拥有自适应效果
 * 注意此mixin必须在任何用到此mixin的vuetify组件引用之前执行，否则不生效
 * 特殊情况可使用异步组件
 */
nativeMeasurable.mixin(Measurable)

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
    options: {
      customProperties: true,
      variations: false,
    },
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans',
  },
  icons: {
    iconfont: 'fa',
  },
})
