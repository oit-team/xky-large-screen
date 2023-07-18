import Vue from 'vue'
import ClothingPriceCard from '../Clothing/PriceCard.vue'
import ProductList from './ProductList'

export default {
  name: 'ShoppingCart',

  data: () => ({}),

  computed: {
    productList() {
      return this.$store.state.shoppingCart.list
    },
  },

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
          const child = slide.map(item => this.$createElement(ClothingPriceCard, {
            class: 'mb-4',
            props: {
              item,
              height: 335,
              cardHeight: 260,
            },
          }, [
            // this.$createElement('div', i),
            this.genTrashBtn(item),
          ]))
          return this.$createElement('div', {
            class: 'swiper-slide flex flex-col',
          }, child)
        },
      })
      return new Slide().$mount().$el
    },
    genTrashBtn(item) {
      return this.$createElement('vc-btn', {
        class: 'mt-2 bg-white',
        props: {
          fab: true,
          small: true,
        },
        on: {
          click: () => this.$store.commit('shoppingCart/remove', item),
        },
      }, [
        this.$createElement('vc-icon', {
          attrs: {
            size: 18,
            color: '#d9d9d9',
          },
        }, 'fas fa-trash-alt'),
      ])
    },
  },

  render(h) {
    return h(ProductList, {
      props: {
        productList: this.productList,
        renderSlide: this.genSlideContent.bind(this),
      },
    })
  },
}
