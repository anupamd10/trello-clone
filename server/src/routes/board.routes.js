import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { getBoards, getBoard, createBoard, updateBoard, deleteBoard } from '../controllers/board.controller.js'
import { createList, reorderLists } from '../controllers/list.controller.js'

const router = Router()

router.use(authMiddleware)

router.get('/', getBoards)
router.post('/', createBoard)
router.get('/:boardId', getBoard)
router.put('/:boardId', updateBoard)
router.delete('/:boardId', deleteBoard)

router.post('/:boardId/lists', createList)
router.put('/:boardId/lists/reorder', reorderLists)

export default router
