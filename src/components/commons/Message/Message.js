import { VBtn, VSnackbar } from 'vuetify/lib/components'
import Vue from 'vue'

const MESSAGE_TYPE = ['success', 'warning', 'info', 'error']

const Message = function (options) {
  if (typeof options === 'string')
    options = { message: options }

  const instance = new Vue({
    data: () => ({
      show: true,
    }),

    methods: {
      close() {
        this.show = false
        Vue.nextTick(() => {
          this.$destroy()
          setTimeout(() => {
            this.$el.remove()
          }, 500)
        })
      },
      genCloseBtn(attrs) {
        return this.$createElement(VBtn, {
          ...attrs,
          props: {
            text: true,
            color: options.color ? '' : 'error',
          },
          on: {
            click: this.close,
          },
        }, '关闭')
      },
      genSnackbar() {
        return this.$createElement(VSnackbar, {
          props: {
            // top: true,
            centered: true,
            timeout: 5000,
            ...options,
            value: this.show,
          },
          on: {
            input: value => !value && this.close(),
          },
          scopedSlots: {
            action: ({ attrs }) => this.genCloseBtn(attrs),
          },
        }, options.message)
      },
    },

    render() {
      return this.genSnackbar()
    },
  })

  Vue.nextTick(() => {
    document
      .querySelector('#app')
      .appendChild(instance.$mount().$el)
  })
}

MESSAGE_TYPE.forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === 'string')
      options = { message: options }

    options.color = type
    return Message(options)
  }
})

export default Message
