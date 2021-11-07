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
    },
    todoMaxOrder(state, getters) {
      let orders = Math.max(...getters.todoList.map((item) => item.order));
      if (orders < 0) {
        orders = 0
      } 
      return orders + 1
    },
    doneMaxOrder(state, getters) {
      let orders = Math.max(...getters.doneList.map((item) => item.order));
      if (orders < 0) {
        orders = 3000
      } 
      return orders + 1
    }
  },
  mutations: {
    checkUser(state) {
      state.user = localStorage.getItem("todoUser")
    },
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    addTodoItem(state, todo) {
      state.allList.push(todo)
    },
    changeTodoItem(state, todo) {
      const idx = state.allList.findIndex(todos => todos.id === todo.id)
      if (idx === -1) return
      state.allList[idx] = todo
    },
    deleteTodoItem(state, id) {
      const idx = state.allList.findIndex(todos => todos.id === id)
      state.allList.splice(idx, 1)
    },
    lineUpTodoItem(state, idList) {
      const ordered = []
      idList.forEach( id => {
        const idx = state.allList.findIndex(todos => todos.id === id)
        ordered.push(state.allList[idx])
        state.allList.splice(idx, 1)
      })
      state.allList.unshift(...ordered)
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
    async createTodo({ state, getters, commit }, addInfo) {
      const { title } = addInfo
      const { data } = await axios({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': state.user,
        },
        data: {
          title,
          order: getters.todoMaxOrder,
        }
      });
      commit('addTodoItem', data)
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
          title,
          done: true,
          order: getters.doneMaxOrder,
        },
      });
      commit('changeTodoItem', data)
    },
    async returnTodo({ state, getters, commit }, todo) {
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
          title,
          done: false,
          order: getters.todoMaxOrder,
        },
      });
      commit('addTodoItem', data)
      commit('deleteTodoItem', id)
    },
    async fixTodo({ state, commit },fixInfo) {
      const { id, title, order } = fixInfo
      const {data} = await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        method: 'put',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': state.user,
        },
        data: {
          title,
          "done": false,
          order,
        }
      });
      commit('changeTodoItem', data)
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
      commit('deleteTodoItem', id)
    },
    async lineUp({ state, commit }, idList) {
      await axios({
        url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder`,
        method: 'put',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202110',
          'username': state.user
        },
        data: {todoIds: idList}
      })
      commit('lineUpTodoItem', idList)
    }
  }
}
