<script>
import Drawer from '@/components/commons/Drawer'
import OptionsItem from '@/components/business/ProductPicker/OptionsItem'

export default {
  components: {
    Drawer,
    OptionsItem,
  },
  props: {
    rightList: Array,
  },
  data() {
    return {
      clickIndex: null,
      showBorder: false,
    }
  },
  methods: {
    open() {
      this.$refs.drawer.open()
    },
    close() {
      this.$refs.drawer.close()
    },
    onClick(item, index) {
      this.$emit('show-info', item)
      this.clickIndex = index
      this.showBorder = false
    },
    isShow() {
      this.$router.push({
        name: 'Lucky',
      })
    },
    reset() {
      this.clickIndex = null
      this.showBorder = false
    },
  },
}
</script>

<template>
  <Drawer ref="drawer" position="right" offset="47%" class="rounded-l-3xl">
    <div class="w-full p-3 pb-0 box-border">
      <div v-for="(item, index) in rightList" :key="item.id" @click="onClick(item, index)">
        <OptionsItem :item-info="item" :size="100" :click-item="index === clickIndex" @lock="$emit('lock')" />
      </div>
    </div>
    <v-divider class="!border-current" />

    <!--        点击试衣间 -->
    <div class="w-full h-7rem p-3 pt-4 box-border flex flex-col justify-center items-center text-sm" @click.stop="isShow">
      <v-badge
        color="#f47b7b"
        :content="$store.state.shoppingCart.list.length"
        :value="!!$store.state.shoppingCart.list.length"
        :offset-x="10"
        :offset-y="10"
      >
        <v-img
          class="rounded-xl w-60px h-60px mb-1"
          :class="showBorder ? 'borders' : ''"
          src="/assets/prize/ff491db29d4d5450b1d05d4311a12af.png"
        />
      </v-badge>
      抽奖
    </div>
  </Drawer>
</template>

<style scoped>
.borders{
  box-shadow: 0 2px 12px 0 #5e8cfd;
}
</style>
