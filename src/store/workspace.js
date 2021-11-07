// import axios from 'axios'
import { getTree } from '~/api/axiosGet'

export default {
  namespaced: true,
  state: () => ({
    userName: 'YooHyungChul',
    workspaceTree: []
  }),
  getters: {
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    // async getWorkspaceTree () {
    //   const tree = await getTree()

    // }
  }
}
