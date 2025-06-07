import { ReminderType } from "daddys-personal-manager"

interface Props {
  entry: ReminderType
  onDelete: (id: string) => void
}

export function ReminderCard({ entry, onDelete }: Props) {
  return (
    <div className="border border-blue-200 bg-white rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div>
        <div className="text-lg font-semibold text-blue-800">{entry.title}</div>
        <div className="text-sm text-blue-500">
          {new Date(entry.time).toLocaleString()}
        </div>
      </div>
      <button
        onClick={() => onDelete(entry.id)}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Delete
      </button>
    </div>
  )
}
