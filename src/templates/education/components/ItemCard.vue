<script>
export default {
  props: {
    item: Object,
    active: Boolean,
  },
  computed: {
    tags() {
      return JSON.parse(this.item.productProjects) || []
    },
  },
}
</script>

<template>
  <v-card
    v-ripple="false"
    class="product-item h-9/10 flex flex-col border-none"
    :data-product-id="item.productId"
  >
    <div class="flex-1 bg-gray relative overflow-hidden" @click="$emit('click', item)">
      <img :src="item.imgUrl" class="h-full w-full object-cover">

      <div class="flex flex-col absolute bottom-0 bg-white bg-opacity-70 w-full">
        <div class="flex items-center py-2 px-3">
          <div class="text-3xl font-bold">
            {{ item.productName }}
          </div>
          <div class="flex-1 text-xs pl-3 overflow-hidden">
            <div>{{ item.productFabric }}</div>
            <div>{{ item.employmentTime }}</div>
            <div class="truncate">
              {{ item.personalSignature }}
            </div>
          </div>
        </div>
        <div class="flex px-3 justify-around gap-3 leading-none pb-2 text-sm">
          <template v-for="(tag, i) of tags">
            <span :key="tag">
              {{ tag }}
            </span>
            <v-divider v-if="tags.length > i + 1" :key="`${tag}-divide`" vertical />
          </template>
        </div>
      </div>
    </div>
    <div class="bg-black p-2 flex items-center text-white">
      <v-btn small class="active-btn" :outlined="!active" :class="{ 'text-white': !active }" @click="$emit('toggle', item.productId, item)">
        感兴趣
      </v-btn>
      <div class="ml-auto text-sm">
        了解更多
        <v-icon class="text-white text-lg ml-1">
          fas fa-angle-double-right
        </v-icon>
      </div>
    </div>
  </v-card>
</template>
