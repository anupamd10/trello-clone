import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export function useSocket(boardId) {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!boardId) return

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || '', { auth: { token: localStorage.getItem('token') } })
    socketRef.current.emit('join-board', boardId)

    return () => {
      socketRef.current.emit('leave-board', boardId)
      socketRef.current.disconnect()
    }
  }, [boardId])

  return socketRef
}
