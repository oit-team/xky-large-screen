import { convertToUnit } from '@/utils/helper'

export default {
  computed: {
    // 具有自适应的元素大小样式
    measurableStyles() {
      const styles = {}
      const size = convertToUnit(this.size)
      const height = convertToUnit(this.height)
      const width = convertToUnit(this.width)
      const minHeight = convertToUnit(this.minHeight)
      const minWidth = convertToUnit(this.minWidth)
      const maxHeight = convertToUnit(this.maxHeight)
      const maxWidth = convertToUnit(this.maxWidth)

      if (size) {
        styles.height = size
        styles.width = size
      }
      if (height)
        styles.height = height
      if (width)
        styles.width = width
      if (minHeight)
        styles.minHeight = minHeight
      if (minWidth)
        styles.minWidth = minWidth
      if (maxHeight)
        styles.maxHeight = maxHeight
      if (maxWidth)
        styles.maxWidth = maxWidth

      return styles
    },
  },
}
