import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

const state = {
    wrapper: 22
}
export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
    modules
}