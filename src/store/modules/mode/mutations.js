/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 * (state, payload)
 */
const mutations = {
    setMode(state, payload) {
        state.wrapper = payload;
    },
}

export default mutations