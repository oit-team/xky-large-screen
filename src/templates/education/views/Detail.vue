<script>
import Preview from '../components/Preview.vue'
import Banner from '../components/Banner.vue'
import Footer from '../components/Footer.vue'
import * as events from '../enums/events'
import { getBrandNameCard, getProductById } from '@/api/product'
import { getSmallImage, getVideoFrame } from '@/utils/helper'

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Preview, Banner, Footer },
  data() {
    return {
      swiperIndex: 0,
      previewDialog: false,
      isInterested: false,
      previewList: [],
      options: {
        on: {
          slideChange: () => {
            this.swiperIndex = this.$headerSwiper.realIndex
          },
        },
      },
      selectedProduct: {},
      data: {},
      brandInfo: {},
      goodAtInfo: [],
    }
  },
  created() {
    this.isInterested = !!+this.$route.query.active
    this.getProductById()
    this.getBrandNameCard()
  },

  mounted() {
    this.$headerSwiper = this.$refs.swiper?.$swiper
  },

  methods: {
    getVideoFrame,
    getSmallImage,
    async getProductById() {
      const res = await getProductById({
        productId: this.$route.params.productId,
        brandId: sessionStorage.getItem('brandId'),
      })
      this.data = res.body
      this.goodAtInfo = this.getValue('productTypeName').split(',')
    },
    async getBrandNameCard() {
      const res = await getBrandNameCard({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.brandInfo = res.body
    },
    async getInterested() {
      this.isInterested = !this.isInterested
      this.$root.$emit(events.TOGGLE_ACTIVE, this.$route.params.productId)
    },
    getValue(key, def) {
      return this.data[key]?.indexValue ?? def
    },
    getLabel(key) {
      return this.data[key]?.indexDescrip
    },
    preview(src) {
      this.$refs.preview.preview([src])
    },
  },
}
</script>

<template>
  <div class="grid grid-rows-[560px,1fr,auto] aspect-9/16">
    <header class="overflow-hidden">
      <Banner />
      <div class="mx-6 flex h-[560px]">
        <div class="flex-1">
          <div class="relative aspect-3/4  h-[560px]">
            <v-swiper
              ref="swiper"
              class="bg-gray rounded-md h-full"
              :options="options"
              @touchmove.native.prevent
            >
              <v-swiper-slide
                v-for="src of data.imgList"
                :key="src"
              >
                <v-img
                  class="img"
                  :src="getSmallImage(src, 'x')"
                  height="100%"
                  contain
                  @click="preview(src)"
                />
              </v-swiper-slide>
            </v-swiper>
            <div
              v-if="data.imgList?.length"
              class="flex absolute bottom-0 z-10 justify-end p-2 w-full"
            >
              <div class="overflow-hidden bg-black bg-opacity-40 rounded">
                <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="() => $headerSwiper.slidePrev()">
                  <vc-icon>fas fa-chevron-left</vc-icon>
                </vc-btn>
                <span class="mx-1 text-white">{{ swiperIndex + 1 }}/{{ data.imgList?.length }}</span>
                <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="() => $headerSwiper.slideNext()">
                  <vc-icon>fas fa-chevron-right</vc-icon>
                </vc-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 flex overflow-hidden flex-col mt-2 px-6">
          <div class="flex flex-col">
            <div class="text-3xl py-1 font-semibold">
              {{ getValue('productName') }}
            </div>
            <div class="w-[40px] h-[5px] my-2 rounded-md bg-black border-black" />
          </div>
          <div class="text-xl py-4 flex-col gap-4">
            <p class="mb-[6px]">
              <span class="text-gray-500 mr-4">{{ getLabel('contactPhone') }}</span>{{ getValue('contactPhone', '暂无') }}
            </p>
            <p class="mb-[6px]">
              <span class="text-gray-500 mr-4">{{ getLabel('employmentTime') }}</span>{{ getValue('employmentTime', '暂无') }}
            </p>
            <p class="flex mb-[6px]">
              <span class="whitespace-nowrap text-gray-500 mr-4">{{ getLabel('honor') }}</span><span v-html="getValue('honor', '暂无')" />
            </p>
            <p class="flex mb-[6px]">
              <span class="whitespace-nowrap text-gray-500 mr-4">{{ getLabel('personalSignature') }}</span><span v-html="getValue('personalSignature', '暂无')" />
            </p>
            <p class="flex mb-[6px]">
              <span class="whitespace-nowrap text-gray-500 mr-4"> {{ getLabel('detailedIntroduction') }}</span><span v-html="getValue('detailedIntroduction', '暂无')" />
            </p>
          </div>
          <div class="flex-1 flex gap-4 justify-start">
            <v-btn
              elevation="2"
              outlined
              @click="getInterested()"
            >
              <v-icon class="text-xs pr-2">
                {{ isInterested ? 'fas fa-star' : 'far fa-star' }}
              </v-icon>
              感兴趣
            </v-btn>
            <!-- <v-btn
              elevation="2"
              outlined
            >
              <v-icon class="text-xs pr-2">
                fas fa-phone-volume
              </v-icon>
              <span class="font-medium">联系我们</span>
            </v-btn> -->
            <v-btn
              depressed
              elevation="2"
              outlined
              @click="$router.back()"
            >
              <v-icon class="text-xs pr-2">
                fas fa-angle-double-left
              </v-icon>
              返回
            </v-btn>
          </div>
        </div>
      </div>
    </header>
    <div class="mt-2 mx-6 pt-2 flex flex-col overflow-hidden">
      <div class="text-3xl flex items-center justify-center font-bold px-2 py-2 goodAtStyle">
        <div v-for="item in goodAtInfo" :key="item" class="goodAtItemStyle px-8 border-r border-black">
          {{ item }}
        </div>
      </div>
      <!-- 案例与课程 -->
      <div class="pt-6 my-2 border-t border-gray-400">
        <div class="text-3xl border-l-10 font-bold border-black px-4 py-1">
          案例与课程
        </div>
        <div>
          <div v-if="data.detailsImgList?.length" class="flex-1 overflow-hidden flex">
            <v-item-group class="h-full max-w-full inline-grid grid-rows-1 grid-flow-col gap-x-4 py-4 px-2 items-center overflow-x-auto">
              <v-item v-for="item of data.detailsImgList" v-slot="{ active, toggle }" :key="item">
                <v-card class="rounded-xl shadow-none overflow-hidden w-300px" :class="active" @click="toggle(), preview(item)">
                  <v-img :src="item" class="h-full aspect-4/5" />
                </v-card>
              </v-item>
            </v-item-group>
          </div>
          <div v-else class="flex-1 grid place-content-center text-3xl">
            敬请期待...
          </div>
        </div>
      </div>
      <!-- 精彩瞬间 -->
      <div class="pt-6 my-2 border-t border-gray-400">
        <div class="text-3xl border-l-10 font-bold border-black px-4 py-1">
          精彩瞬间
        </div>
        <div>
          <div v-if="data.videoList?.length" class="flex-1 overflow-hidden flex">
            <v-item-group class="h-full max-w-full inline-grid grid-rows-1 grid-flow-col gap-x-4 py-4 px-2 items-center overflow-x-auto">
              <v-item v-for="item of data.videoList" v-slot="{ active, toggle }" :key="item">
                <v-card class="rounded-xl shadow-none overflow-hidden relative w-300px" :class="active" @click="toggle(), preview(item)">
                  <v-img :src="getVideoFrame(item)" class="h-full aspect-4/5" />
                  <v-icon class="absolute top-1/2 left-1/2 z-10 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2">
                    fas fa-play
                  </v-icon>
                </v-card>
              </v-item>
            </v-item-group>
          </div>
          <div v-else class="flex-1 grid place-content-center text-3xl">
            敬请期待...
          </div>
        </div>
      </div>
    </div>

    <Footer />
    <Preview ref="preview" />
  </div>
</template>

<style lang="scss" scoped>
.goodAtStyle :last-child{
  border: 0px;
}
</style>
