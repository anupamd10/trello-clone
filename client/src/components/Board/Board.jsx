import { useState } from 'react'
import BoardHeader from './BoardHeader'
import List from '../List/List'
import AddList from '../List/AddList'

export default function Board({ board, setBoard, socketRef }) {
  const [lists, setLists] = useState(board.lists ?? [])

  const addList = (list) => setLists((prev) => [...prev, { ...list, cards: [] }])
  const removeList = (listId) => setLists((prev) => prev.filter((l) => l.id !== listId))
  const updateList = (listId, updates) =>
    setLists((prev) => prev.map((l) => (l.id === listId ? { ...l, ...updates } : l)))

  return (
    <div className="min-h-screen bg-blue-600">
      <BoardHeader board={board} setBoard={setBoard} />
      <div className="flex gap-3 p-4 overflow-x-auto items-start">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            onRemove={removeList}
            onUpdate={updateList}
            socketRef={socketRef}
          />
        ))}
        <AddList boardId={board.id} onAdd={addList} />
      </div>
    </div>
  )
}
