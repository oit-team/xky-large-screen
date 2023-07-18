import { VBtn } from 'vuetify/lib/components'

import './Button.scss'

const { props } = VBtn.options

// @vue/component
export default {
  name: 'VcBtn',

  extends: VBtn,

  props: {
    // 默认显示凹陷
    depressed: {
      ...props.depressed,
      default: true,
    },
  },
}
