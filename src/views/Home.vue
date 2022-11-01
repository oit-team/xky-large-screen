<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    message: 'Hello World!',
  }),
})
</script>

<template>
  <div>
    {{ message }}
  </div>
</template>
