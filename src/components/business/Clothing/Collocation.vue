<script>
import store from '@/store'
import { getSmallImage } from '@/utils/helper'

export default {
  name: 'Collocation',

  props: {
    height: [String, Number],
    width: [String, Number],
    item: Object,
  },

  computed: {
    product() {
      return [...this.item.commoditys].splice(0, 3)
    },
  },

  methods: {
    preview() {
      store.commit('selectProduct', this.item)
    },
    getSmallImage,
  },
}
</script>

<template>
  <v-card
    v-ripple="false"
    class="overflow-hidden"
    :height="height"
    :width="width"
    @click="preview"
  >
    <div class="flex relative z-10 flex-col text-center bg-white h-full">
      <div>
        <v-img
          height="300"
          :src="getSmallImage(item.imgUrl)"
          :lazy-src="getSmallImage(item.imgUrl)"
        />
      </div>
      <!--      <div class="p-2 box-border text-xs font-bold truncate leading-6"> -->
      <!--        {{ item.productName }} -->
      <!--      </div> -->
      <div class="mt-1 text-xs text-gray-500 truncate">
        {{ item.productName }}
      </div>
      <div class="my-2 text-xs font-bold text-red-500">
        ￥{{ item.productPrice }}
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1/1;
}
</style>
