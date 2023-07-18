<script>
import { convertToUnit, getSmallImage } from '@/utils/helper'

export default {
  name: 'ClothingPriceCard',

  props: {
    item: Object,
    height: [String, Number],
    width: [String, Number],
    imgSize: [String, Number],
    cardHeight: [String, Number],
  },

  computed: {
    styles() {
      return {
        minHeight: convertToUnit(this.height),
        width: convertToUnit(this.width),
      }
    },
  },

  methods: {
    _getSmallImage: getSmallImage,
  },
}
</script>

<template>
  <div :style="styles" class="flex-shrink-0 flex flex-col">
    <v-card class="text-center overflow-hidden flex flex-col flex-1" :min-height="cardHeight" elevation="0">
      <v-img
        :src="_getSmallImage(item.imgUrl)"
        :size="imgSize"
        height="300"
        :lazy-src="_getSmallImage(item.imgUrl)"
        transition="none"
      />
      <div class="px-1">
        <!--        <div class="mt-2 text-xs font-bold truncate"> -->
        <!--          {{ item.productNo }} -->
        <!--        </div> -->
        <div class="mt-1 text-xs text-gray-500 truncate">
          {{ item.productName }}
        </div>
        <div class="my-2 text-xs font-bold text-red-500">
          ￥{{ item.productPrice }}
        </div>
      </div>
    </v-card>
    <div class="text-center">
      <slot />
    </div>
  </div>
</template>
