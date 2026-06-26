import api from './api'

export const boardService = {
  getAll: async () => {
    const { data } = await api.get('/boards')
    return data
  },

  getById: async (boardId) => {
    const { data } = await api.get(`/boards/${boardId}`)
    return data
  },

  create: async (title) => {
    const { data } = await api.post('/boards', { title })
    return data
  },

  update: async (boardId, title) => {
    const { data } = await api.put(`/boards/${boardId}`, { title })
    return data
  },

  remove: async (boardId) => {
    await api.delete(`/boards/${boardId}`)
  },
}
