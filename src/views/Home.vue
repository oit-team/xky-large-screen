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
    <v-btn>123</v-btn>
  </div>
</template>
