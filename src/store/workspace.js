import axios from '~/api/axiosCustomSet'

export default {
  namespaced: true,
  state: () => ({
    workspaceTree: [],
    workSpaceDetail: '',
    workSpacePath: []
  }),
  getters: {
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
  },
  actions: {
    async getWorkspaceTree ({ commit }) {
      const { data : workspaceTree } = await axios.get()
      commit('assignState', { workspaceTree })
    },
    async getWorkspaceDetail({ commit }, id) {
      const { data : workSpaceDetail} = await axios.get(`/${id}`)
      commit('assignState', { workSpaceDetail })
    },
    setPath({ commit }, path) {
      commit('assignState', { workSpacePath : path })
    },
    async createWorkspace({ dispatch }, parentId) {
      const data = { parentId, title: '', content: ''}
      const { data: info } = await axios.post('', data)
      dispatch('getWorkspaceTree')
      dispatch('setPath', [])
      return info.id
    },
    async editWorkspace({ dispatch }, obj){
      await axios.put(`/${obj.id}`, obj.data)
      dispatch('getWorkspaceTree')
    },
    async deleteWorkspace({ dispatch }, id) {
      await axios.delete(`/${id}`)
      dispatch('getWorkspaceTree')
      dispatch('setPath', [])
    }
  }
}
