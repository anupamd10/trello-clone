import api from './api'

export const listService = {
  create: async (boardId, title) => {
    const { data } = await api.post(`/boards/${boardId}/lists`, { title })
    return data
  },

  update: async (listId, updates) => {
    const { data } = await api.put(`/lists/${listId}`, updates)
    return data
  },

  remove: async (listId) => {
    await api.delete(`/lists/${listId}`)
  },

  reorder: async (boardId, listIds) => {
    const { data } = await api.put(`/boards/${boardId}/lists/reorder`, { listIds })
    return data
  },
}
