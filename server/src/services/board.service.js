import { prisma } from '../lib/prisma.js'

export const boardService = {
  getAll: async (userId) =>
    prisma.board.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'asc' } }),

  getById: async (boardId, userId) => {
    const board = await prisma.board.findFirst({
      where: { id: boardId, ownerId: userId },
      include: { lists: { orderBy: { position: 'asc' }, include: { cards: { orderBy: { position: 'asc' } } } } },
    })
    if (!board) {
      const err = new Error('Board not found')
      err.status = 404
      throw err
    }
    return board
  },

  create: async (title, userId) =>
    prisma.board.create({ data: { title, ownerId: userId } }),

  update: async (boardId, title, userId) => {
    const board = await prisma.board.findFirst({ where: { id: boardId, ownerId: userId } })
    if (!board) {
      const err = new Error('Board not found')
      err.status = 404
      throw err
    }
    return prisma.board.update({ where: { id: boardId }, data: { title } })
  },

  remove: async (boardId, userId) => {
    const board = await prisma.board.findFirst({ where: { id: boardId, ownerId: userId } })
    if (!board) {
      const err = new Error('Board not found')
      err.status = 404
      throw err
    }
    await prisma.board.delete({ where: { id: boardId } })
  },
}
