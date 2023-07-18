import { getAdvertsInfo } from '@/api/product'

export default {
  namespaced: true,
  state: {
    display: false,
    options: [],
    resources: [],
  },
  mutations: {
    setOptions(state, options) {
      state.options = options
    },
    setResources(state, res) {
      state.resources = res
    },
  },
  actions: {
    async updateResources(ctx) {
      const res = await getAdvertsInfo(sessionStorage.getItem('devId'))
      const {
        rotationRules,
        resEntityMap,
      } = res.body.advertsRes
      ctx.commit('setOptions', JSON.parse(rotationRules))
      ctx.commit('setResources', resEntityMap)
    },
    async displayAfterUpdatingResources(ctx) {
      await ctx.dispatch('updateResources')
      ctx.state.display = true
    },
  },
}
