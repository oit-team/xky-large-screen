<script>
import mime from 'mime-types'
import Plyr from '@/components/commons/Plyr'

export default {
  components: {
    [Plyr.name]: Plyr,
  },

  data: () => ({
    list: [],
    dialog: false,
    options: {
      autoplay: true,
      fullscreen: {
        enabled: false,
      },
      keyboard: {
        focused: false,
      },
      controls: ['progress', 'play-large'],
      // hideControls: false,
      clickToPlay: true,
    },
  }),

  methods: {
    preview(list) {
      if (!Array.isArray(list)) return

      this.list = list.map((item) => {
        item = typeof item === 'string' ? { src: item } : item
        return {
          type: item.type ?? mime.lookup(item.src)?.includes('video') ? 'video' : 'image',
          src: item.src,
        }
      })

      this.dialog = true
    },
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="80vw"
    overlay-opacity="0.8"
  >
    <v-card v-if="dialog" class="p-0">
      <div v-for="item of list" :key="item.src">
        <v-img
          v-if="item.type === 'image'"
          class="h-full"
          :src="item.src"
          contain
        />
        <vc-plyr v-if="item.type === 'video'" :src="item.src" :options="options" />
      </div>
    </v-card>
  </v-dialog>
</template>
