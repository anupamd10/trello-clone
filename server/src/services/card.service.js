import { prisma } from '../lib/prisma.js'

export const cardService = {
  create: async (listId, title, userId) => {
    const list = await prisma.list.findFirst({
      where: { id: listId, board: { ownerId: userId } },
    })
    if (!list) {
      const err = new Error('List not found')
      err.status = 404
      throw err
    }
    const count = await prisma.card.count({ where: { listId } })
    return prisma.card.create({ data: { title, listId, position: count } })
  },

  update: async (cardId, updates, userId) => {
    const card = await prisma.card.findFirst({
      where: { id: cardId, list: { board: { ownerId: userId } } },
    })
    if (!card) {
      const err = new Error('Card not found')
      err.status = 404
      throw err
    }
    return prisma.card.update({ where: { id: cardId }, data: updates })
  },

  remove: async (cardId, userId) => {
    const card = await prisma.card.findFirst({
      where: { id: cardId, list: { board: { ownerId: userId } } },
    })
    if (!card) {
      const err = new Error('Card not found')
      err.status = 404
      throw err
    }
    await prisma.card.delete({ where: { id: cardId } })
  },

  move: async (cardId, listId, position, userId) => {
    const card = await prisma.card.findFirst({
      where: { id: cardId, list: { board: { ownerId: userId } } },
    })
    if (!card) {
      const err = new Error('Card not found')
      err.status = 404
      throw err
    }
    return prisma.card.update({ where: { id: cardId }, data: { listId, position } })
  },
}
