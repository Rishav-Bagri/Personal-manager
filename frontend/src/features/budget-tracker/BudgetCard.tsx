import { BudgetTrackerType } from "daddys-personal-manager"
import { CheckCircle, Circle } from "lucide-react"

interface Props {
  entry: BudgetTrackerType
  onTogglePaid: (id: string, paid: boolean) => void
}

export function BudgetCard({ entry, onTogglePaid }: Props) {
  return (
    <div className="flex justify-between items-center border border-green-200 bg-white rounded-xl p-4 shadow-sm">
      <div>
        <div className="text-lg font-semibold text-green-800">
          {entry.thingsToSpend} - ₹{entry.money}
        </div>
        <div className="text-sm text-green-600">{entry.category}</div>
        <div className="text-xs text-gray-500">
          Paid By: {new Date(entry.paidBy).toLocaleString()}
        </div>
      </div>
      <button
        onClick={() => onTogglePaid(entry.id, !entry.paid)}
        className="text-green-600 hover:text-green-800"
        title={entry.paid ? "Mark as unpaid" : "Mark as paid"}
      >
        {entry.paid ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>
    </div>
  )
}
