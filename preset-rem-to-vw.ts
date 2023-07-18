import type { Preset } from '@unocss/core'

const remRE = /(-?[\.\d]+)rem/g

export interface RemToVwOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number
}

export default function remToVwPreset(options: RemToVwOptions = {}): Preset<any> {
  const {
    baseFontSize = 16,
  } = options

  return {
    name: '@unocss/preset-rem-to-vw',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize / 1080 * 100}vw`)
      })
    },
  }
}
