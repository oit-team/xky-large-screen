import { Swipe, SwipeItem } from 'vant'

import Image from './types/Image'
import Video from './types/Video'

import './Carousel.scss'

import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'

export default {
  name: 'page-carousel',

  provide() {
    return {
      carousel: this,
    }
  },

  props: {
    options: Array,
    // 资源是键值对，键对应资源ID
    resources: Object,
  },

  data: () => ({
    realIndex: 0,
    lockSwiper: false,
  }),

  methods: {
    genSwiper() {
      return this.$createElement(Swipe, {
        ref: 'swiper',
        class: 'page-carousel',
        on: {
          change: (index) => {
            this.realIndex = index
            this.$emit('change', index)
          },
        },
        nativeOn: {
          touchmove: e => e.preventDefault(),
        },
      }, this.genSwiperSlide())
    },
    genSwiperSlide() {
      return this.options.map((config, index) => {
        return this.$createElement(SwipeItem, {
          class: 'page-carousel__wrapper',
          style: {
            '--slide-first-child-flex': `0 0 ${config.divider * 100}%`,
          },
        }, this.genContainer(config, index))
      })
    },
    genContainer(config, index) {
      const refKey = `slide${index}`

      return config.items.map((item) => {
        const switchComponent = (type) => {
          switch (type) {
            case 'image':
              return Image
            case 'video':
              return Video
          }
          return undefined
        }

        const component = switchComponent(item.type)
        if (!component)
          return undefined

        if (this.options.length === 1 && item.type === 'video')
          config.loop = true

        item.src ??= this.resources[item.srcId].resUrl

        return this.$createElement(component, {
          ref: refKey,
          refInFor: true,
          props: {
            index,
            realIndex: this.realIndex,
            item,
            config,
            lock: this.lockSwiper,
          },
          on: {
            next: () => {
              // 禁用下一个
              if (config.disabledNext)
                return
              const allReady = this.$refs[refKey].every(blockItem => blockItem.readyNext)
              // 前往下一个轮播内容，如果没有下一个，则回到第一个
              if (allReady)
                this.$refs.swiper.next()
            },
            close: () => {
              this.$emit('close')
            },
          },
        }, item.type)
      })
    },
    lock() {
      this.lockSwiper = true
    },
    unlock() {
      this.lockSwiper = false
    },
  },

  render() {
    return this.genSwiper()
  },
}
