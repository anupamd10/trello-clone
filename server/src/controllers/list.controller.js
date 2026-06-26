import { listService } from '../services/list.service.js'

export const createList = async (req, res, next) => {
  try {
    const list = await listService.create(req.params.boardId, req.body.title, req.user.id)
    res.status(201).json(list)
  } catch (err) { next(err) }
}

export const updateList = async (req, res, next) => {
  try {
    const list = await listService.update(req.params.listId, req.body, req.user.id)
    res.json(list)
  } catch (err) { next(err) }
}

export const deleteList = async (req, res, next) => {
  try {
    await listService.remove(req.params.listId, req.user.id)
    res.status(204).end()
  } catch (err) { next(err) }
}

export const reorderLists = async (req, res, next) => {
  try {
    const lists = await listService.reorder(req.params.boardId, req.body.listIds, req.user.id)
    res.json(lists)
  } catch (err) { next(err) }
}
