<script>
export default {
  props: {
    itemInfo: Object,
    size: Number,
    clickItem: Boolean,
  },
  methods: {
  },
}
</script>

<template>
  <div class="goodsItem flex flex-col leading-relaxed">
    <div class="relative">
      <v-img
        v-if="itemInfo.resUrl"
        :src="itemInfo.resUrl"
        class="rounded-xl bg-white"
        :class="clickItem ? 'boxShadow' : ''"
        :light="true"
        :width="size"
        :height="size"
      />
    </div>
    <div class="text-sm text-center">
      <div class="my-1 w-7em truncate mx-auto">
        {{ itemInfo.productName }}
      </div>
      <div class="mb-1">
        ￥{{ itemInfo.productPrice }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.boxShadow{
  box-shadow: 0 2px 12px 0 #5e8cfd;
}

.btn {
  border-radius: 50%;
  -webkit-animation-name: greenPulse;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
}
</style>
