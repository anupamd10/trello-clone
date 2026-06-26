import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { updateList, deleteList } from '../controllers/list.controller.js'
import { createCard } from '../controllers/card.controller.js'

const router = Router()

router.use(authMiddleware)

router.put('/:listId', updateList)
router.delete('/:listId', deleteList)
router.post('/:listId/cards', createCard)

export default router
