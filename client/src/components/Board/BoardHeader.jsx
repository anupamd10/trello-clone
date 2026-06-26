import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../../services/boardService'

export default function BoardHeader({ board, setBoard }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(board.title)
  const navigate = useNavigate()

  const handleSave = async () => {
    const updated = await boardService.update(board.id, title)
    setBoard((prev) => ({ ...prev, title: updated.title }))
    setEditing(false)
  }

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-black/20 text-white">
      <button onClick={() => navigate('/')} className="hover:underline text-sm">Home</button>
      {editing ? (
        <input
          autoFocus
          className="bg-white text-gray-900 rounded px-2 py-1 font-bold text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <h1 onClick={() => setEditing(true)} className="font-bold text-lg cursor-pointer hover:bg-white/20 px-2 py-1 rounded">
          {board.title}
        </h1>
      )}
    </div>
  )
}
