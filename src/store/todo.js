import axios from 'axios'

export default {
  namespaced: true,
  state: () => ({
    todos: [],
    user: ''
  }),
  getters: {
    todoList(state) {
      return state.todos.filter(todo => !todo.done)
    },
    doneList(state) {
      return state.todos.filter(todo => todo.done)
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
      const foundTodo = state.todos.find(t => t.id === todo.id)
      foundTodo = todo
    }
  },
  actions: {
    async getTodos({ commit }) {
      const { data: todos } = await axios({
        url: "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
        method: "get",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: 'YooHyungChul',
        },
      });
      commit('assignState', {
        todos
      })
    },
    createTodo() {

    },
    updateTodo() {

    },
    async doneTodo({ getters, commit }, todo) {
      const { id, title } = todo
      const { data } = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        method: "put",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: this.user,
        },
        data: {
          order: 3000 + getters.doneList.length,
          title,
          done: true,
        },
      });
      commit('updateTodo', data)
    },
    async deleteTodo(context, todoId) {
      await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
        method: "delete",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202110",
          username: 'YooHyungChul',
        },
      });
    }
  }
}
