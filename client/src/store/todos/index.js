import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default {
  namespaced: true,
  state: {
    todos: []
  },
  getters: {
    current: ({ todos }) => todos.filter(todo => !todo.archived),
    archived: ({ todos }) => todos.filter(todo => todo.archived)
  },
  mutations: {
    SET_TODOS: (state, todos) => (state.todos = todos),
    SET_TASK_COMPLETION: (state, { id, completed }) => {
      const todo = state.todos.find(todo => todo.id === id)

      todo.completed = completed
    }
  },
  actions: {
    GET_ALL: async ({ commit }) => {
      const res = await api.get('/todos')

      commit('SET_TODOS', res.data)
    },
    ADD_NEW: async ({ dispatch }, task) => {
      await api.post('/todos', {
        task
      })

      dispatch('GET_ALL')
    },
    TOGGLE_COMPLETE: async ({ commit, dispatch }, { todo, completed }) => {
      await api.put(`/todos/${todo.id}`, {
        completed
      })

      dispatch('GET_ALL')
    }
  }
}
