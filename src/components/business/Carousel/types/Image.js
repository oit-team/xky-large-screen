import { VImg } from 'vuetify/lib/components'

import mixin from './mixin'

export default {
  name: 'image-type',

  mixins: [mixin],

  data() {
    this.timer = null
    return {}
  },

  watch: {
    'active': {
      handler(value) {
        if (this.lock) return

        if (value) {
          this.slideNext()
        }
        else {
          this.stopNext()
        }
      },
      immediate: true,
    },
    'carousel.show': function (value) {
      if (value) {
        this.active && this.slideNext()
      }
      else {
        this.stopNext()
      }
    },
    lock() {
      if (!this.active) return

      this.lock
        ? this.stopNext()
        : this.slideNext()
    },
  },

  methods: {
    slideNext() {
      this.timer = setTimeout(() => {
        this.readyNext = true
        this.$emit('next')
      }, this.config.duration || 5000)
    },
    stopNext() {
      this.readyNext = false
      clearTimeout(this.timer)
    },
  },

  render(h) {
    const {
      src,
      fit,
    } = this.item

    return h(VImg, {
      props: {
        src,
        lazySrc: src,
      },
      style: {
        '--slide-object-fit': fit,
      },
      on: {
        click: () => this.$emit('close'),
      },
    })
  },
}
