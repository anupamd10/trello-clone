import { cardService } from '../services/card.service.js'

export const createCard = async (req, res, next) => {
  try {
    const card = await cardService.create(req.params.listId, req.body.title, req.user.id)
    res.status(201).json(card)
  } catch (err) { next(err) }
}

export const updateCard = async (req, res, next) => {
  try {
    const card = await cardService.update(req.params.cardId, req.body, req.user.id)
    res.json(card)
  } catch (err) { next(err) }
}

export const deleteCard = async (req, res, next) => {
  try {
    await cardService.remove(req.params.cardId, req.user.id)
    res.status(204).end()
  } catch (err) { next(err) }
}

export const moveCard = async (req, res, next) => {
  try {
    const card = await cardService.move(req.params.cardId, req.body.listId, req.body.position, req.user.id)
    res.json(card)
  } catch (err) { next(err) }
}
