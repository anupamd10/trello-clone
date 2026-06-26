export default function Card({ card, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
    >
      {card.title}
    </div>
  )
}
