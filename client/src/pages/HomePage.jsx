import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/boardService'
import { useAuth } from '../context/AuthContext'
import Button from '../components/UI/Button'
import Spinner from '../components/UI/Spinner'

export default function HomePage() {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    boardService.getAll().then(setBoards).finally(() => setLoading(false))
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const board = await boardService.create(newTitle.trim())
    setBoards((prev) => [...prev, board])
    setNewTitle('')
  }

  if (loading) return <Spinner />

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Trello Clone</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <Button variant="ghost" onClick={logout}>Log out</Button>
        </div>
      </header>

      <main className="p-8">
        <h2 className="text-lg font-semibold mb-4">Your Boards</h2>
        <div className="grid grid-cols-4 gap-4">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
              className="bg-blue-500 text-white rounded-md p-4 h-24 cursor-pointer hover:bg-blue-600 font-semibold"
            >
              {board.title}
            </div>
          ))}
          <form onSubmit={handleCreate} className="bg-gray-200 rounded-md p-4 h-24 flex flex-col gap-2">
            <input
              className="rounded px-2 py-1 text-sm text-gray-800 border border-gray-300"
              placeholder="Board title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button type="submit" size="sm">Create board</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
