<script>
export default {
  props: {
    value: [String, Number],
  },

  data: () => ({
    keys: [
      ...Array.from({ length: 9 }, (_, i) => {
        return {
          label: `${i + 1}`,
          type: 'add',
        }
      }),
      {
        icon: 'fas fa-backspace',
        type: 'delete',
        color: 'error',
      },
      {
        label: '0',
        type: 'add',
      },
      {
        label: '确定',
        type: 'confirm',
        color: 'primary',
      },
    ],
  }),

  methods: {
    handler(item) {
      switch (item.type) {
        case 'add':
          this.$emit('input', `${this.value}${item.label}`)
          break
        case 'delete':
          this.$emit('input', `${this.value}`.slice(0, -1))
          break
        case 'confirm':
          this.$emit('confirm')
          break
      }
    },
  },
}
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <v-btn
      v-for="item of keys"
      :key="item.label"
      :color="item.color"
      depressed
      large
      @click="handler(item)"
    >
      <v-icon v-if="item.icon">
        {{ item.icon }}
      </v-icon>
      <template v-if="item.label">
        {{ item.label }}
      </template>
    </v-btn>
  </div>
</template>
