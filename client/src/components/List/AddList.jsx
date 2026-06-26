import { useState } from 'react'
import { listService } from '../../services/listService'

export default function AddList({ boardId, onAdd }) {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const list = await listService.create(boardId, title.trim())
    onAdd(list)
    setTitle('')
    setAdding(false)
  }

  if (!adding) {
    return (
      <button
        onClick={() => setAdding(true)}
        className="bg-white/20 hover:bg-white/30 text-white rounded-xl w-64 shrink-0 p-3 text-sm text-left"
      >
        + Add a list
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl w-64 shrink-0 p-2 flex flex-col gap-2">
      <input
        autoFocus
        className="border rounded px-2 py-1 text-sm"
        placeholder="List title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white text-xs rounded px-3 py-1">Add list</button>
        <button type="button" onClick={() => setAdding(false)} className="text-xs text-gray-500">Cancel</button>
      </div>
    </form>
  )
}
