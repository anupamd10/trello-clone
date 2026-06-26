import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { boardService } from '../services/boardService'
import { useSocket } from '../hooks/useSocket'
import Board from '../components/Board/Board'
import Spinner from '../components/UI/Spinner'

export default function BoardPage() {
  const { boardId } = useParams()
  const [board, setBoard] = useState(null)
  const [loading, setLoading] = useState(true)
  const socketRef = useSocket(boardId)

  useEffect(() => {
    boardService.getById(boardId).then(setBoard).finally(() => setLoading(false))
  }, [boardId])

  if (loading) return <Spinner />
  if (!board) return <p className="p-8">Board not found.</p>

  return <Board board={board} setBoard={setBoard} socketRef={socketRef} />
}
