import { boardService } from '../services/board.service.js'

export const getBoards = async (req, res, next) => {
  try {
    const boards = await boardService.getAll(req.user.id)
    res.json(boards)
  } catch (err) { next(err) }
}

export const getBoard = async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.boardId, req.user.id)
    res.json(board)
  } catch (err) { next(err) }
}

export const createBoard = async (req, res, next) => {
  try {
    const board = await boardService.create(req.body.title, req.user.id)
    res.status(201).json(board)
  } catch (err) { next(err) }
}

export const updateBoard = async (req, res, next) => {
  try {
    const board = await boardService.update(req.params.boardId, req.body.title, req.user.id)
    res.json(board)
  } catch (err) { next(err) }
}

export const deleteBoard = async (req, res, next) => {
  try {
    await boardService.remove(req.params.boardId, req.user.id)
    res.status(204).end()
  } catch (err) { next(err) }
}
