<script>
import Collocation from './Collocation.vue'
import GoodsInfo from '@/components/business/ProductPicker/GoodsInfo'

export default {
  components: {
    Collocation,
    GoodsInfo,
  },
  props: {
    options: Array,
    advertsStyleMap: Object,
    resources: Object,
    optionsIndex: Number,
  },
  data() {
    return {
      infoData: [],
      rightList: [],
      opacity: 0,
      overlay: false,
      timer: null,
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.shoppingCart.list
    },
  },
  watch: {
    rightList: {
      deep: true,
      handler() {
        if (this.rightList && this.rightList.length !== 0) {
          this.$refs.collocation.open()
        }
        else {
          this.$refs.collocation.close()
          this.$refs.info.close()
        }
      },
    },
    options: 'changeList',
    optionsIndex: 'changeList',
  },
  mounted() {
    this.$refs.info.close()
  },
  methods: {
    showInfo(item) {
      clearTimeout(this.timer)
      this.infoData = item.adverGoodsDetails
      this.$refs.info.open()
      this.overlay = true
      this.$emit('lock')
      this.timer = setTimeout(() => {
        this.closeOverlay()
      }, 60000)
    },
    showFitting() {
      clearTimeout(this.timer)
      this.$refs.info.close()
      this.overlay = true
      this.$emit('lock')
      this.timer = setTimeout(() => {
        this.closeOverlay()
      }, 60000)
    },
    changeList() {
      const goods = this.options[this.optionsIndex].goods
      const optionsItem = goods?.reduce((def, next) => [...def, this.advertsStyleMap[next]], [])
      this.rightList = optionsItem
    },
    lock() {
      this.$emit('lock')
      this.timer = setTimeout(() => {
        this.$emit('unlock')
      }, 60000)
    },
    closeOverlay() {
      this.overlay = false
      this.$emit('unlock')
      this.$refs.info.close()
      this.$refs.collocation.reset()
    },
  },
}
</script>

<template>
  <div>
    <Collocation ref="collocation" :right-list="rightList" @show-info="showInfo" @lock="lock" />
    <v-overlay
      ref="overlay"
      :opacity="opacity"
      z-index="60"
      :value="overlay"
      @click="closeOverlay"
    />

    <GoodsInfo ref="info" :info-data="infoData" />
  </div>
</template>

<style>
</style>
