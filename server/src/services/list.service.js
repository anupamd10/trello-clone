import { prisma } from '../lib/prisma.js'

export const listService = {
  create: async (boardId, title, userId) => {
    const board = await prisma.board.findFirst({ where: { id: boardId, ownerId: userId } })
    if (!board) {
      const err = new Error('Board not found')
      err.status = 404
      throw err
    }
    const count = await prisma.list.count({ where: { boardId } })
    return prisma.list.create({ data: { title, boardId, position: count } })
  },

  update: async (listId, updates, userId) => {
    const list = await prisma.list.findFirst({
      where: { id: listId, board: { ownerId: userId } },
    })
    if (!list) {
      const err = new Error('List not found')
      err.status = 404
      throw err
    }
    return prisma.list.update({ where: { id: listId }, data: updates })
  },

  remove: async (listId, userId) => {
    const list = await prisma.list.findFirst({
      where: { id: listId, board: { ownerId: userId } },
    })
    if (!list) {
      const err = new Error('List not found')
      err.status = 404
      throw err
    }
    await prisma.list.delete({ where: { id: listId } })
  },

  reorder: async (boardId, listIds, userId) => {
    const board = await prisma.board.findFirst({ where: { id: boardId, ownerId: userId } })
    if (!board) {
      const err = new Error('Board not found')
      err.status = 404
      throw err
    }
    await Promise.all(
      listIds.map((id, position) => prisma.list.update({ where: { id }, data: { position } }))
    )
    return prisma.list.findMany({ where: { boardId }, orderBy: { position: 'asc' } })
  },
}
