<script>
import { throttle } from 'lodash'
import { pageClick } from './api/frame'

export default {
  name: 'App',

  created() {
    // 从url中获取参数
    const queryObject = new URLSearchParams(location.href.split('?')[1])
    const query = {}

    for (const key of queryObject.keys())
      query[key] = queryObject.get(key)

    // 保存到sessionStorage
    query.token && sessionStorage.setItem('token', query.token)
    query.devId && sessionStorage.setItem('devId', query.devId)
    query.brandId && sessionStorage.setItem('brandId', query.brandId)

    // 禁用浏览器长按菜单
    window.addEventListener('contextmenu', e => e.preventDefault())

    const pageClickThrottled = throttle(() => {
      pageClick({
        devId: query.devId,
        brandId: query.brandId,
      })
    }, 1000)
    // 页面产生交互通知
    window.addEventListener('click', pageClickThrottled, { passive: true })
    window.addEventListener('touchstart', pageClickThrottled, { passive: true })
  },
}
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
#app {
  font-size: 16px;
}
</style>
