export default {
  inject: ['carousel'],

  props: {
    index: Number,
    realIndex: Number,
    item: Object,
    config: Object,
    lock: Boolean,
  },

  data() {
    return {
      // 准备好跳转到下一个，只有全部都准备好才会跳转
      readyNext: false,
    }
  },

  computed: {
    active() {
      return this.index === this.realIndex
    },
  },
}
