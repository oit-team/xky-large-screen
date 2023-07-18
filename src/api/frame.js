import axios from 'axios'

const frame = axios.create({
  baseURL: 'http://127.0.0.1:10000',
})

/**
 * 进入商品页面
 * @param params
 */
export function enterShopPage(params) {
  return frame.get('/goodsPage', {
    params: {
      ...params,
      time: Date.now(),
    },
  })
}

/**
 * 进入轮播页面
 * @param params
 */
export function enterCarouselPage(params) {
  return frame.get('/carousePage', {
    params: {
      ...params,
      time: Date.now(),
    },
  })
}

/**
 * 页面交互
 * @param params
 */
export function pageClick(params) {
  return frame.get('/pageClick', {
    params: {
      ...params,
      time: Date.now(),
    },
  })
}
