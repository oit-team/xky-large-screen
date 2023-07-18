import { VImg } from 'vuetify/lib/components'
import Measurable from '@/mixins/Measurable'

// @vue/component
export default {
  name: 'VcImg',

  extends: VImg,

  mixins: [Measurable],

  props: {
    size: [String, Number],
  },

  render(h) {
    return VImg.options.render.call(this, h)
  },
}
