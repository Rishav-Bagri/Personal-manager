import { useState } from "react"
import { BudgetTrackerType, BudgetTrackerUpdateType } from "daddys-personal-manager"

interface Props {
  entry: BudgetTrackerType
  onUpdate: (id: string, update: BudgetTrackerUpdateType) => void
}

export function BudgetCard({ entry, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    money: entry.money,
    paid: entry.paid,
  })

  const handleSave = () => {
    onUpdate(entry.id, {
        id: entry.id,
        ...form
    })
    setEditing(false)
  }

  return (
    <div className="bg-white p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{entry.thingsToSpend}</div>
        <div className="text-sm text-gray-500">{entry.category}</div>
      </div>
      <div className="text-gray-700 mb-2">Amount: ₹{form.money}</div>
      <div className="text-gray-500 text-sm">Paid By: {new Date(entry.paidBy).toLocaleString()}</div>
      <div className="flex items-center space-x-4 mt-2">
        {editing ? (
          <>
            <input
              type="text"
              value={form.money}
              onChange={e => setForm({ ...form, money: e.target.value })}
              className="border p-1 rounded"
            />
            <label>
              <input
                type="checkbox"
                checked={form.paid}
                onChange={e => setForm({ ...form, paid: e.target.checked })}
              />{" "}
              Paid
            </label>
            <button className="text-green-600" onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <span className={`text-sm ${entry.paid ? "text-green-600" : "text-red-600"}`}>
              {entry.paid ? "Paid" : "Unpaid"}
            </span>
            <button className="text-blue-600" onClick={() => setEditing(true)}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  )
}
