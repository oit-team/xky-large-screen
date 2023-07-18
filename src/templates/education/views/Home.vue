<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { chunk, throttle } from 'lodash'
import ItemCard from '../components/ItemCard.vue'
import Banner from '../components/Banner.vue'
import Keyboard from '../components/Keyboard.vue'
import Footer from '../components/Footer.vue'
import * as events from '../enums/events'
import { getProductAll, getProductParent, insertGoodsPhoneRelation } from '@/api/product'

const TABS = {
  LIST: 0,
  SHOPPING_CART: 1,
}

export default {
  components: {
    Swiper,
    SwiperSlide,
    ItemCard,
    Keyboard,
    Banner,
    // eslint-disable-next-line vue/no-reserved-component-names
    Footer,
  },
  data() {
    return {
      TABS,
      deleteConfirm: false,
      keyboardDialog: false,
      loading: false,
      tab: TABS.LIST,
      list: [],
      typeList: [],
      selectedType: undefined,
      selectedMap: {},
      phone: '',
      phoneRules: [
        value => !!value || '请输入手机号',
        value => (value && value.length === 11) || '请输入正确的手机号',
      ],
    }
  },
  computed: {
    swiperOption() {
      return {
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false,
        // },
        direction: 'vertical',
        slidesPerView: 3,
        loop: this.list.length > 9,
        on: {
          click: throttle(this.clickItem, 300, { leading: true, trailing: false }),
        },
      }
    },
    listChunk() {
      return chunk(this.list, 3)
    },
    selectedCount() {
      return Object.keys(this.selectedMap).length
    },
  },
  watch: {
    selectedType() {
      this.tab = TABS.LIST
      this.getProductAll()
    },
  },
  created() {
    this.getProductParent()
    this.getProductAll()
  },
  methods: {
    async getProductAll() {
      this.loading = true
      const res = await getProductAll({
        brandId: sessionStorage.getItem('brandId'),
        pageSize: 999,
        pageNum: 1,
        productType: this.selectedType,
      }).finally(() => {
        // 延迟结束loading
        setTimeout(() => this.loading = false)
      })

      this.list = res.body.resultList
    },
    clickItem(e) {
      const item = e.target.closest('.product-item')
      const active = e.target.closest('.active-btn')
      if (!item) return

      const productId = item.dataset.productId

      active ? this.toggleItem(productId) : this.toDetail(productId)
    },
    async getProductParent() {
      const res = await getProductParent({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.typeList = [
        {
          key: '',
          typeName: '全部',
          typeImg: 'assets/img/jewellery/all.png',
        },
        ...res.body.resultList,
      ]
    },
    async submitPhone() {
      if (this.phone === '' || this.phone.length !== 11) {
        this.$message.error('请输入正确手机号')
        return false
      }

      const productIds = Object.keys(this.selectedMap).join(',')

      if (!productIds) return this.$message.error('未选择感兴趣内容')

      await insertGoodsPhoneRelation({
        productIds: Object.keys(this.selectedMap).join(','),
        brandId: sessionStorage.getItem('brandId'),
        devId: sessionStorage.getItem('devId'),
        phone: this.phone,
      })
      this.keyboardDialog = false
      this.phone = ''
      this.$message.success('已通知工作人员')
    },
    addItem(id, item) {
      this.$set(this.selectedMap, id, item)
    },
    removeItem(id) {
      this.$delete(this.selectedMap, id)
    },
    toggleItem(id, item) {
      if (this.selectedMap[id]) {
        this.removeItem(id)
      }
      else {
        item ??= this.list.find(item => item.productId === +id)
        this.addItem(id, item)
      }
    },
    hasItem(id) {
      return !!this.selectedMap[id]
    },
    clearItem() {
      this.selectedMap = {}
    },
    toDetail(productId) {
      // 是否已选中，number类型
      const active = +!!this.selectedMap[productId]
      this.$router.push(`/template/education/detail/${productId}?active=${active}`)
      this.$root.$off(events.TOGGLE_ACTIVE, this.toggleItem)
      this.$root.$on(events.TOGGLE_ACTIVE, this.toggleItem)
    },
  },
}
</script>

<template>
  <div class="aspect-9/16 overflow-hidden flex flex-col">
    <Banner />

    <main class="flex flex-col flex-1 overflow-hidden">
      <swiper v-if="!loading && list.length && tab === TABS.LIST" class="h-full w-80vw ml-5" :options="swiperOption" @touchmove.native.prevent>
        <swiper-slide v-for="(chunk, index) of listChunk" :key="index">
          <div class="grid grid-cols-3 gap-5 h-full">
            <div
              v-for="(item, i) of chunk"
              :key="i"
              class="flex flex-col overflow-hidden"
            >
              <ItemCard :item="item" :active="hasItem(item.productId)" />
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div v-if="tab === TABS.SHOPPING_CART && selectedCount" class="w-80vw ml-5 grid grid-cols-3 grid-rows-[repeat(auto-fill,33%)] gap-x-5 flex-1">
        <div
          v-for="item of selectedMap"
          :key="item.productId"
          class="flex flex-col"
        >
          <ItemCard
            class="h-4/5"
            :item="item"
            :active="hasItem(item.productId)"
            @click="toDetail(item.productId)"
            @toggle="toggleItem"
          />
        </div>
      </div>

      <template>
        <div v-if="loading && tab === TABS.LIST" class="grid place-content-center flex-1">
          <div class="w-40vw">
            <div class="text-3xl mb-2 text-center">
              正在加载...
            </div>
            <v-progress-linear
              indeterminate
              rounded
              height="6"
            />
          </div>
        </div>
        <div v-if="!loading && ((tab === TABS.LIST && !list.length) || (tab === TABS.SHOPPING_CART && !selectedCount))" class="grid place-content-center flex-1">
          <div class="text-4xl mb-2 text-center">
            暂无数据
          </div>
        </div>
      </template>
    </main>

    <Footer />

    <div class="absolute right-0 top-1/5 w-150px">
      <v-item-group v-model="selectedType" class="flex flex-col gap-2 bg-white rounded-r-md" mandatory>
        <v-item v-for="item of typeList" v-slot="{ active, toggle }" :key="item.typeId" :value="item.key ?? item.typeName">
          <div
            class="flex rounded-l-lg p-2"
            :class="{ 'bg-gray': active }"
            @click="toggle"
          >
            <v-img class="h-30px w-30px flex-grow-0" :src="item.typeImg" />
            <div class="text-gray-500 text-sm flex-1">
              <div class="py-1 px-3 rounded w-full" style="text-align-last: justify">
                {{ item.typeName }}
                <div class="w-full" />
              </div>
            </div>
          </div>
        </v-item>
      </v-item-group>

      <div class="flex flex-col items-center pt-6">
        <v-badge
          class="z-10 flex-1"
          :content="Object.keys(selectedMap).length || '0'"
          color="#c00000"
          offset-x="12"
          offset-y="12"
        >
          <v-btn outlined @click="tab = TABS.SHOPPING_CART">
            感兴趣
          </v-btn>
        </v-badge>
        <div class="flex justify-around mt-2">
          <div
            v-click-outside="() => deleteConfirm = false"
          >
            <v-btn
              v-if="!deleteConfirm"
              text
              @click="deleteConfirm = true"
            >
              <vc-icon size="16" color="#8a8a8a">
                fas fa-trash-alt
              </vc-icon>
            </v-btn>
            <v-btn
              v-else
              class="px-0 w-full"
              text
              color="error"
              @click="clearItem()"
            >
              确定
            </v-btn>
          </div>
          <v-divider vertical class="my-2" />
          <v-btn text @click="tab = TABS.LIST">
            <v-icon size="16" color="#8a8a8a">
              fas fa-home
            </v-icon>
          </v-btn>
        </div>

        <v-btn depressed dark class="mt-4" @click="keyboardDialog = true, phone = ''">
          联系我们
        </v-btn>
        <!-- <div class="flex justify-around mt-2">
          <v-btn text>
            <v-icon size="16" color="#8a8a8a">
              fab fa-weixin
            </v-icon>
          </v-btn>
          <v-divider vertical class="my-2" />
          <v-btn text>
            <v-icon size="16" color="#8a8a8a">
              far fa-envelope
            </v-icon>
          </v-btn>
        </div> -->
      </div>
    </div>

    <v-dialog
      v-model="keyboardDialog"
      width="700px"
    >
      <v-card>
        <v-card-title>请留下您的联系方式，我们将联系您</v-card-title>
        <div class="px-4 pb-4">
          <v-text-field
            v-model="phone"
            label="手机号"
            readonly
            :rules="phoneRules"
          />
          <Keyboard v-model="phone" class="w-4/5 mx-auto" @confirm="submitPhone()" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.vertical-btn {
  flex-direction: column;
  padding: 10px !important;

  .v-btn__content {
    flex-direction: inherit;
  }

  .vertical-text {
    text-align: center;
    writing-mode: vertical-lr;
  }
}
</style>
