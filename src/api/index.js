import Axios from 'axios'
import API_STATUS from '@/api/API_STATUS'
import Message from '@/components/commons/Message'

// axios配置
const axiosConfig = {
  // 请求超时时间
  timeout: 60000,
  baseURL: '/api',
}

// 创建axios实例
const axios = Axios.create(axiosConfig)

/**
 * 请求拦截器
 */
axios.interceptors.request.use((config) => {
  config.headers.token = sessionStorage.token

  return config
}, error => Promise.reject(error))

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => response, error => Promise.reject(error))

const defaultConfig = {
  tips: true,
}

/**
 * post封装
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {object} config 配置
 */
export function post(url, params = {}, config = {}) {
  const {
    tips,
    ...__config
  } = { ...defaultConfig, ...config }

  const userData = {
    brandId: sessionStorage.getItem('brandId'),
  }

  const formattedParams = {
    head: {
      aid: '0',
      ver: '1.0',
      ln: 'cn',
      mod: 'app',
      de: '2019-10-16',
      sync: 1,
      uuid: userData.brandId,
      chcode: 'ef19843298ae8f2134f',
    },
    con: params,
  }

  return axios
    .post(url, formattedParams, __config)
    .then((res) => {
      if (!res.headers['content-type'].includes('application/json')) return res.data

      if (res.data && res.data.head.status === API_STATUS.OK)
        return res.data

      tips && Message.error(res.data.head.msg)
      return Promise.reject(res.data)
    })
    .catch(err => Promise.reject(err))
}

export default axios
