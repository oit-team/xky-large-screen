import Vue from 'vue'

import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

import { VBtn } from 'vuetify/lib/components'
import mixin from './mixin'

// 双击判定时间(ms)
const INTERVAL = 300

export default {
  name: 'video-type',

  mixins: [mixin],

  data() {
    this.timer = null
    this.timestamp = 0
    return {}
  },

  watch: {
    active(value) {
      // 切换播放
      this.player.togglePlay(value)
      // 重置播放
      if (!value)
        this.stopPlay()
    },
    // 'carousel.show': function (value) {
    //   if (value) {
    //     this.active && this.player.play()
    //   } else {
    //     // 轮播关闭后延迟暂停视频
    //     setTimeout(() => this.stopPlay(), 500)
    //   }
    // },
  },

  mounted() {
    this.player = new Plyr(this.$el, {
      // 自动播放
      // autoplay: this.autoplay,
      // loop: {
      //   active: true,
      // },
      fullscreen: {
        enabled: false,
      },
      keyboard: {
        focused: false,
      },
      controls: ['progress', 'play-large'],
      hideControls: false,
      clickToPlay: false,
    })

    this.hideControls()
    this.bindPlyrListeners()
    // BUG：activated钩子未正常调用，解决：主动调用activated钩子
    this.$nextTick(this.$options.activated[0])
  },

  activated() {
    const { autoplay } = this.$route.query
    // 首次自动播放 0：禁用 1：启用
    this.autoplay = !autoplay || Boolean(Number(autoplay))
    // 设置循环播放
    this.player.loop = Boolean(this.config.loop)
    // 自动播放
    this.autoplay && this.handleTogglePlay(true)
  },

  deactivated() {
    // 轮播关闭后延迟暂停视频
    setTimeout(() => this.handleTogglePlay(false), 500)
  },

  destroyed() {
    this.player.destroy()
  },

  methods: {
    genVideo() {
      return this.$createElement('video', {
        attrs: {
          'src': this.item.src,
          'data-poster': this.item.poster,
        },
        class: 'vc-plyr__video',
        style: {
          '--slide-object-fit': this.item.fit,
        },
        on: {
          click: this.handleClick,
        },
      })
    },
    genControls() {
      const Controls = Vue.extend({
        render: h => h('div', {
          class: 'vc-plyr__controls',
        }, [
          h(VBtn, '测试'),
        ]),
      })

      return new Controls().$mount().$el
    },
    bindPlyrListeners() {
      const showControls = this.showControls.bind(this)
      const hideControls = this.hideControls.bind(this)

      this.player.on('pause', () => {
        this._debugState('pause')
        showControls()
      })
      this.player.on('stalled', () => {
        this._debugState('stalled')
        showControls()
      })
      this.player.on('playing', () => {
        this._debugState('playing')
        hideControls()
      })
      this.player.on('ended', () => {
        this._debugState('ended')
        hideControls()
        this.slideNext()
      })
    },
    handleClick() {
      // 验证单击还是双击
      if (Date.now() - this.timestamp < INTERVAL) {
        clearTimeout(this.timer)
        this.timestamp = 0

        this.player.togglePlay()
      }
      else {
        this.timestamp = Date.now()
        this.timer = setTimeout(() => {
          this.$emit('close')
        }, INTERVAL)
      }
    },
    hideControls() {
      this.player.toggleControls(false)
    },
    showControls() {
      this.player.toggleControls(true)
    },
    stopPlay() {
      this.player.stop()
      this.readyNext = false
      setTimeout(() => this.hideControls())
    },
    slideNext() {
      if (this.lock) {
        this.player.play()
        return
      }

      this.readyNext = true
      this.$emit('next')
    },
    handleTogglePlay(value) {
      if (value) {
        console.info('play')
        this.active && setTimeout(() => this.player.play())
      }
      else {
        this.stopPlay()
      }
    },
    _debugState(state) {
      console.info(`[${this.index}] 播放状态 ==> ${state}`)
    },
  },

  render() {
    return this.genVideo()
  },
}
