import { useState } from 'react'
import { listService } from '../../services/listService'
import Card from '../Card/Card'
import CardModal from '../Card/CardModal'
import { cardService } from '../../services/cardService'

export default function List({ list, onRemove, onUpdate }) {
  const [cards, setCards] = useState(list.cards ?? [])
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState(list.title)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [addingCard, setAddingCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleTitleSave = async () => {
    await listService.update(list.id, { title })
    onUpdate(list.id, { title })
    setEditingTitle(false)
  }

  const handleAddCard = async (e) => {
    e.preventDefault()
    if (!newCardTitle.trim()) return
    const card = await cardService.create(list.id, newCardTitle.trim())
    setCards((prev) => [...prev, card])
    setNewCardTitle('')
    setAddingCard(false)
  }

  const handleRemoveList = async () => {
    await listService.remove(list.id)
    onRemove(list.id)
  }

  const updateCard = (cardId, updates) =>
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, ...updates } : c)))

  const removeCard = (cardId) =>
    setCards((prev) => prev.filter((c) => c.id !== cardId))

  return (
    <div className="bg-gray-100 rounded-xl w-64 shrink-0 p-2 flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        {editingTitle ? (
          <input
            autoFocus
            className="font-semibold text-sm rounded px-1 py-0.5 border w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
          />
        ) : (
          <h3 onClick={() => setEditingTitle(true)} className="font-semibold text-sm cursor-pointer flex-1">{title}</h3>
        )}
        <button onClick={handleRemoveList} className="text-gray-400 hover:text-gray-600 text-xs ml-2">✕</button>
      </div>

      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => setSelectedCard(card)} />
      ))}

      {addingCard ? (
        <form onSubmit={handleAddCard} className="flex flex-col gap-1">
          <input
            autoFocus
            className="border rounded px-2 py-1 text-sm"
            placeholder="Card title..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <div className="flex gap-1">
            <button type="submit" className="bg-blue-500 text-white text-xs rounded px-2 py-1">Add</button>
            <button type="button" onClick={() => setAddingCard(false)} className="text-xs text-gray-500">Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setAddingCard(true)} className="text-sm text-gray-500 hover:text-gray-800 text-left px-1">+ Add a card</button>
      )}

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={(updates) => { updateCard(selectedCard.id, updates); setSelectedCard((c) => ({ ...c, ...updates })) }}
          onDelete={() => { removeCard(selectedCard.id); setSelectedCard(null) }}
        />
      )}
    </div>
  )
}
