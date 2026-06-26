import { verifyToken } from './utils/jwt.js'
import { SOCKET_EVENTS } from './utils/constants.js'

export function registerSocketHandlers(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    const user = verifyToken(token)
    if (!user) return next(new Error('Unauthorized'))
    socket.user = user
    next()
  })

  io.on('connection', (socket) => {
    socket.on('join-board', (boardId) => socket.join(`board:${boardId}`))
    socket.on('leave-board', (boardId) => socket.leave(`board:${boardId}`))
  })
}

export function emitBoardEvent(io, boardId, event, payload) {
  io.to(`board:${boardId}`).emit(event, payload)
}
