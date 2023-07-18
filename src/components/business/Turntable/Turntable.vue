<script>
export default {
  data() {
    return {
      stop: true,
    }
  },
}
</script>

<template>
  <div class="h-auto" @click="stop = !stop">
    <v-img
      class="pan-img"
      :class="stop ? 'stopImg' : 'runImg'"
      src="@/asset/image/pan.png"
    />
  </div>
</template>

<style scoped>
.pan-img{
  transition: 2s;
  transform: rotateZ(360deg);
  animation: myfirst2 1s infinite linear;
}
.stopImg{
  animation-play-state: paused;
}
.runImg{
  animation-play-state: running;
}
@keyframes myfirst2
{
  from {transform: rotate(0deg);}
  to {transform: rotate(359deg);}
}

@keyframes myfirst
{
  from {transform: rotate(0deg);}
  to {transform: rotate(-359deg);}
}
</style>
