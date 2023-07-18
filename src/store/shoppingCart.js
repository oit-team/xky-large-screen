export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    add(state, item) {
      state.list.push(item)
    },
    remove(state, item) {
      const index = state.list.indexOf(item)
      if (~index)
        state.list.splice(index, 1)
    },
    clear(state) {
      state.list = []
    },
  },
}
