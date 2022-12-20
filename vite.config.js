import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Eslint from 'vite-plugin-eslint'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'

const config = defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },

  build: {
    minify: true,
  },

  plugins: [
    vue(),

    // https://www.npmjs.com/package/unocss
    Unocss(),

    // https://www.npmjs.com/package/unplugin-vue-components
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
      dts: 'src/components.d.ts',
    }),

    // https://www.npmjs.com/package/unplugin-auto-import
    AutoImport({
      imports: [
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    Eslint(),
  ],

  server: {
    port: 3333,
  },
})

export default config
