import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state =
{
    renderTime: 0
}

const mutations =
{
    SET_RENDER_TIME(state, time)
    {
        state.renderTime = time
    }
}

const actions =
{
    CALCULATE_RENDER_TIME({commit}, {time, startedTime})
    {
        commit('SET_RENDER_TIME', time - startedTime)
    },
}

const store = new Vuex.Store
({
    state,
    mutations,
    actions
})

export default store