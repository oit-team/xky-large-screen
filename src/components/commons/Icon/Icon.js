import { VIcon } from 'vuetify/lib/components'
import { convertToUnit } from '../../../utils/helper'

// @vue/component
export default {
  name: 'VcIcon',

  functional: true,

  inheritAttrs: false,

  render(h, ctx) {
    const data = {
      ...ctx.data,
      props: {
        ...ctx.props,
        size: convertToUnit(ctx.props.size),
      },
    }

    return h(VIcon, data, ctx.children)
  },
}
