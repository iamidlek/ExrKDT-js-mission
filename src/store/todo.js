import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    allList: [],
    user: ''
  }),
  getters: {
    todoList(state) {
      return state.allList.filter(todo => !todo.done)
    },
    doneList(state) {
      return state.allList.filter(todo => todo.done)
    }
  },
  mutations: {
    checkUser(state) {
      state.user = localStorage.getItem("todo")
    },
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    updateTodo(state, todo) {
      const idx = state.allList.findIndex(todos => todos.id === todo.id)
      state.allList[idx] = todo
    },
    delTodo(state, id) {
      const idx = state.allList.findIndex(todos => todos.id === id)
      state.allList.splice(idx, 1)
    },
  },
  actions: {
    async getTodos({ state, commit }) {
      const { data: allList } = await axios({
        url: "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
        method: "get",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: state.user,
        },
      });
      commit('assignState', { allList })
    },
    createTodo() {

    },
    updateTodo() {

    },
    async doneTodo({ state, getters, commit }, todo) {
      const { id, title } = todo
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        method: "put",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: state.user,
        },
        data: {
          order: 3000 + getters.doneList.length,
          title,
          done: true,
        },
      });
      commit('updateTodo', data)
    },
    async deleteTodo({state, commit}, id) {
      await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        method: "delete",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: state.user,
        },
      });
      commit('delTodo', id)
    }
  }
}
