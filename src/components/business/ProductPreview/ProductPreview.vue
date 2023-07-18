<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'ProductPreview',

  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    value: Boolean,
    index: Number,
    list: Array,
  },

  computed: {
    imgResources() {
      return this.list ?? this.$store.state.selectedProduct?.imgResources ?? []
    },
  },

  watch: {
    value() {
      this.$nextTick(() => {
        this.value && this.$refs.swiper.$swiper.slideTo(this.index, 0)
      })
    },
  },

  created() {
    this.swiperOption = {
      pagination: {
        el: '.swiper-pagination',
      },
    }
  },
}
</script>

<template>
  <v-fade-transition>
    <div v-show="value" class="product-preview" @click="$emit('input', !value)">
      <Swiper ref="swiper" :options="swiperOption" @touchmove.native.prevent>
        <SwiperSlide v-for="item of imgResources" :key="item">
          <v-img :src="item" height="100%" />
        </SwiperSlide>

        <div
          v-show="imgResources.length > 1"
          slot="pagination"
          class="swiper-pagination"
        />
      </Swiper>
    </div>
  </v-fade-transition>
</template>

<style scoped lang="scss">
.product-preview {
  position: fixed;
  z-index: 100;
  width: 100vw;
  background-color: #ffffff;
  aspect-ratio: 9/16;

  .swiper-container {
    height: 100%;

    .swiper-pagination {
      bottom: 100px;
    }

    ::v-deep .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
    }

    ::v-deep .swiper-pagination-bullet-active {
      --swiper-pagination-color: black;
    }
  }
}
</style>
