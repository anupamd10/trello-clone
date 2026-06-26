import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { updateCard, deleteCard, moveCard } from '../controllers/card.controller.js'

const router = Router()

router.use(authMiddleware)

router.put('/:cardId', updateCard)
router.delete('/:cardId', deleteCard)
router.put('/:cardId/move', moveCard)

export default router
