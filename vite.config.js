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
      dirs: [],
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
    proxy: {
      '/api': {
        target: 'http://192.168.9.67:9092',
        changeOrigin: true,
        rewrite: path => path.replace('/api', ''),
      },
      '/gdy': {
        target: 'http://222.186.58.235:18104/gdy',
        changeOrigin: true,
        rewrite: path => path.replace('/gdy', ''),
      },
    },
  },
})

export default config
