import axios from '~/api/axiosCustomSet'

export default {
  namespaced: true,
  state: () => ({
    workspaceTree: [],
    workSpaceDetail: ''
  }),
  getters: {
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    setDetail(state, payload) {
      state.workSpaceDetail = payload
    }
  },
  actions: {
    async getWorkspaceTree ({ commit }) {
      const { data : workspaceTree } = await axios.get()
      commit('assignState', { workspaceTree })
    },
    async getWorkspaceDetail({ commit }, id) {
      const { data } = await axios.get(`/${id}`)
      commit('setDetail', data)
    }
  }
}
