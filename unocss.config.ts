import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'
import presetRemToVw from './preset-rem-to-vw'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    // @ts-expect-error ignore
    presetRemToVw(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
