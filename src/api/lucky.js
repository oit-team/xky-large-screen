import { post } from '.'

export function getLuckyDrawConfig() {
  return post('/goods/dictitemInfo/getLuckyDrawConfig')
}

export function getAwardInfo(params) {
  return post('/jackpot/jackpotInfo/getAwardInfo', params)
}

export function getAwardInfoQrCode(params) {
  return post('/jackpot/jackpotInfo/getAwardInfoQrCode', params, {
    responseType: 'blob',
  })
}

export function getResetPrizeInfo(params) {
  return post('/jackpot/jackpotInfo/getResetPrizeInfo', params)
}

export function getJackpotInfoList(params) {
  return post('/jackpot/jackpotInfo/getJackpotInfoList', params)
}

export function getJackpotCount(params) {
  return post('/jackpot/jackpotInfo/getJackpotCount', params)
}
