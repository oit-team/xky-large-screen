import Vue from 'vue'
import { isEmpty } from 'lodash/lang'
import Collocation from '../Clothing/Collocation.vue'
import ProductList from './ProductList'
import { getProductList } from '@/api/product'

export default {
  name: 'CollocationList',

  data: () => ({
    productList: [],
    page: 1,
  }),

  methods: {
    genSlideContent(slide) {
      if (!slide)
        return undefined
      const { $vuetify } = this

      const Slide = Vue.extend({
        created() {
          // 问题: 图标无法正常显示
          // 定位到问题是$vuetify成了一个组件，具体原因未知
          // 暂时选择直接修改值来解决
          this.$vuetify = $vuetify
        },
        render: () => {
          const child = slide.map(item => this.$createElement(Collocation, {
            class: 'mb-4',
            props: {
              height: 335,
              item,
            },
          }))
          return this.$createElement('div', {
            class: 'swiper-slide flex flex-col',
          }, child)
        },
      })
      return new Slide().$mount().$el
    },
    loadData({ done }) {
      getProductList({
        pageNum: this.page,
        pageSize: 20,
        brandId: sessionStorage.getItem('brandId'),
        styleCategory: '',
      })
        .then((res) => {
          const { collocationList } = res.body
          if (collocationList.length) {
            this.productList = this.page === 1
              ? collocationList
              : this.productList.concat(collocationList)
            this.page++

            if (isEmpty(this.$store.state.selectedProduct))
              this.$store.commit('selectProduct', this.productList[0])
          }
        })
        .finally(() => {
          // 延迟一会，避免频繁请求
          setTimeout(done, 500)
        })
    },
  },

  render(h) {
    return h(ProductList, {
      props: {
        productList: this.productList,
        renderSlide: this.genSlideContent.bind(this),
      },
      on: {
        load: this.loadData,
      },
    })
  },
}
