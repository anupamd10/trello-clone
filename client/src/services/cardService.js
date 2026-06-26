import api from './api'

export const cardService = {
  create: async (listId, title) => {
    const { data } = await api.post(`/lists/${listId}/cards`, { title })
    return data
  },

  update: async (cardId, updates) => {
    const { data } = await api.put(`/cards/${cardId}`, updates)
    return data
  },

  remove: async (cardId) => {
    await api.delete(`/cards/${cardId}`)
  },

  move: async (cardId, listId, position) => {
    const { data } = await api.put(`/cards/${cardId}/move`, { listId, position })
    return data
  },
}
