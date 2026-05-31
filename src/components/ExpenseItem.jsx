// Created: 2026-01-14 10:00
// v5 - Initial file: ExpenseItem component
// Purpose: Renders a single expense row with inline editable amount field.
//   - Debounces via onBlur / Enter key before syncing to Firestore
//   - Shows delete button on row hover

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'

export default function ExpenseItem({ expense, onUpdate, onRemove }) {
  const [value, setValue] = useState(expense.amount ?? 0)

  useEffect(() => {
    setValue(expense.amount ?? 0)
  }, [expense.amount])

  const commit = () => onUpdate(expense.id, value)

  return (
    <div className="flex items-center px-4 py-3 gap-3 hover:bg-gray-50 group">
      <span className="flex-1 text-sm text-gray-700">{expense.name}</span>
      <div className="flex items-center gap-1">
        <input
          type="number"
          className="w-28 text-right border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          value={value}
          min="0"
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
        />
        <span className="text-xs text-gray-400 w-6">kr</span>
      </div>
      <button
        onClick={() => onRemove(expense.id)}
        className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-400 transition-all"
        aria-label="Fjern utgift"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
