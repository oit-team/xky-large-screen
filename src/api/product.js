import API_SERVICE from './API_SERVICE'
import { post } from './index'

/**
 * 获取商品列表
 * @param {object} params
 */
export function getProductList(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getCollocationList`, params)
}

/**
 * 查询商品类别
 * @param params
 */
export function getCategory(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getStyleType`, params)
    .then(res => res.body.resultList)
}

/**
 * 查询轮播广告
 * @param {string} devId 设备ID
 */
export function getAdvertsInfo(devId) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getAdvertsInfo`, { devId })
}

/**
 * 试衣间添加商品
 * @param {string} devId 设备ID
 */
export function addFittingRecord(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/device/addFittingRecord`, params)
}

/**
 * 查询一级分类
 */
export function getProductParent(params) {
  return post('/liveBroadcast/adverts/getProductParent', params)
}

/**
 * 查询产品列表
 */
export function getProductAll(params) {
  return post('/liveBroadcast/adverts/getProductAll', params)
}

/**
 * 查询产品详情
 */
export function getProductById(params) {
  return post('/liveBroadcast/adverts/getProductById', params)
}

/**
 * 查询品牌名片详情
 */
export function getBrandNameCard(params) {
  return post('/liveBroadcast/adverts/getBrandNameCard', params)
}

/**
 * 生成订单 绑定手机号
 */
export function insertGoodsPhoneRelation(params) {
  return post('/liveBroadcast/adverts/insertGoodsPhoneRelation\n', params)
}
