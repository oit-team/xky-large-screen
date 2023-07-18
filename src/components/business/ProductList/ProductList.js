import { Swiper } from 'vue-awesome-swiper'
import { chunk } from 'lodash'

// @vue/component
export default {
  name: 'ProductList',

  props: {
    productList: {
      type: Array,
      default: () => ([]),
    },
    renderSlide: Function,
  },

  data: () => ({
    options: {},
    len: 19,
    loading: false,
  }),

  computed: {
    productListChunked() {
      return chunk(this.productList, 2)
    },
  },

  watch: {
    productList: {
      handler() {
        this.cleanLastOneCache()
        this.$swiper.virtual.slides = this.productListChunked
        this.$swiper.virtual.update()
      },
      deep: true,
    },
  },

  created() {
    this.options = {
      setWrapperSize: true,
      freeMode: true,
      shortSwipes: false,
      slidesPerView: 5.5,
      spaceBetween: 30,
      momentumRatio: 1,
      momentumVelocityRatio: 0.8,
      virtual: {
        slides: this.productListChunked,
        renderSlide: this.renderSlide,
        addSlidesBefore: 6,
        addSlidesAfter: 6,
      },
      on: {
        // TODO 自由模式下滚动结束对齐到第一列
        transitionEnd: () => {
        },
        slideChange: () => {
          if (!this.$swiper)
            return
          this.loadData()
        },
      },
    }
  },

  mounted() {
    this.$swiper = this.$refs.swiper.$swiper
    this.loadData()
  },

  methods: {
    cleanLastOneCache() {
      // 问题：当slide里只有一个项目时，即使后续添加了新项，也不会刷新
      // 解决：清理最后一个slide缓存，使其重新加载
      const last = Object
        .keys(this.$swiper.virtual.cache)
        .at(-1)
      const lastSlide = this.$swiper.virtual.cache[last]?.[0]
      if (lastSlide?.__vue__?.$children?.length === 1) {
        this.$swiper.virtual.removeSlide(this.productListChunked.length - 1)
        delete this.$swiper.virtual.cache[last]
      }
    },
    genProductList() {
      return this.$createElement(Swiper, {
        ref: 'swiper',
        class: 'flex-1 px-8',
        props: {
          options: this.options,
        },
      })
      // TODO 实现loading效果
    },
    loadData() {
      if ((this.productListChunked.length - this.$swiper.realIndex) < 10 && !this.loading) {
        this.loading = true
        this.$emit('load', {
          done: this.loadDone,
        })
      }
    },
    loadDone() {
      this.loading = false
    },
  },

  render() {
    return this.genProductList()
  },
}
