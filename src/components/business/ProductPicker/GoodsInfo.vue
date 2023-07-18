<script>
import Drawer from '@/components/commons/Drawer'

export default {
  components: {
    Drawer,
  },
  props: {
    infoData: Array,
  },
  computed: {
    list() {
      return this.infoData.filter((item) => {
        return item.fieldValue !== null
      })
    },
  },
  methods: {
    open() {
      this.$refs.drawer.open()
    },
    close() {
      this.$refs.drawer.close()
    },
  },
}
</script>

<template>
  <Drawer ref="drawer" position="left" offset="50%" class="rounded-r-3xl drawerW z-61">
    <div class="w-full p-3 leading-15">
      <div v-for="(item, index) in list" :key="index" class="info-item flex">
        <div class="lable w-32 text-center">
          {{ item.fieldName }}
        </div>
        <div class="lable w-3/5">
          {{ item.fieldValue }}
        </div>
      </div>
    </div>
  </Drawer>
</template>

<style scoped>
.drawerW{
  width: 50vw;
}
</style>
