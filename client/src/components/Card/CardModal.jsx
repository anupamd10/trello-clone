import { useState } from 'react'
import { cardService } from '../../services/cardService'
import Modal from '../UI/Modal'
import Button from '../UI/Button'

export default function CardModal({ card, onClose, onUpdate, onDelete }) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? '')

  const handleSave = async () => {
    const updated = await cardService.update(card.id, { title, description })
    onUpdate(updated)
    onClose()
  }

  const handleDelete = async () => {
    await cardService.remove(card.id)
    onDelete()
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4 p-6 w-full max-w-lg">
        <input
          className="text-xl font-semibold border-b pb-1 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded px-3 py-2 text-sm resize-none h-28 focus:outline-none"
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-between">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="danger" onClick={handleDelete}>Delete card</Button>
        </div>
      </div>
    </Modal>
  )
}
