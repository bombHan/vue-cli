/**
 * 用action的主要目的：调用异步 API 和分发多重 mutation
 * (context, payload)
 *
    context: {
        state,      // 等同于 `store.state`，若在模块中则为局部状态
        rootState,  // 等同于 `store.state`，只存在于模块中
        commit,     // 等同于 `store.commit`
        dispatch,   // 等同于 `store.dispatch`
        getters,    // 等同于 `store.getters`
        rootGetters // 等同于 `store.getters`，只存在于模块中
    }
 */
const actions = {
  setMode({ commit, state }, params) {
      commit('setMode', params)
    }
}
export default actions