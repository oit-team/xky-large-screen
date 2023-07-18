import projectConfig from '@/project.config'

/**
 * 转换单位
 * @param str
 * @param unit 单位默认px
 * @returns {string|undefined}
 */
export function convertToUnit(str, unit = 'px') {
  let size

  if (str === null || str === undefined || str === '')
    return undefined

  if (Number.isNaN(+str))
    size = String(str)
  else
    size = `${Number(str)}${unit}`

  if (/([0-9]+(\.?[0-9]+)?)px$/.test(size)) {
    const num = parseFloat(size)
    const calculated = parseFloat((num / projectConfig.viewportWidth * 100).toFixed(6))
    return `${calculated}vw`
  }

  return size
}

/**
 * 格式化日期时间
 * @param date 日期时间
 * @param format 格式
 * @returns {string} format 格式后的日期时间
 */
export const formatDate = (date, format = 'yyyy/MM/dd') => {
  let _date = date
  let _format = format
  if (_date === undefined)
    return ''
  // 此处将横杠"-"替换成"/"是为了处理ios端兼容
  _date = new Date(typeof _date === 'string' ? _date.replace(/-/g, '/') : _date)
  if (_date.toString() === 'Invalid Date')
    return ''
  if (/(y+)/.test(_format))
    _format = _format.replace(RegExp.$1, (`${_date.getFullYear()}`).substr(4 - RegExp.$1.length))

  const o = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds(),
  }

  Object.entries(o)
    .forEach(([key, value]) => {
      if (new RegExp(`(${key})`).test(_format)) {
        _format = _format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? value : (`00${value}`).substr(value.length),
        )
      }
    })

  return _format
}

export function getSmallImage(img, size = 's') {
  return img && img.replace(/(.*)\./, `$1_${size}.`)
}

export function getVideoFrame(src) {
  return src && src.replace(/(.*)\..*/, '$1_s.jpg')
}
