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
    <v-btn v-ripple="false">
      123
    </v-btn>
  </div>
</template>
