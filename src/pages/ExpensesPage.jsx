// Created: 2026-01-14 10:00
// v6 - Initial file: ExpensesPage component
// Purpose: Main expense management screen.
//   - Editable monthly income fields for Person A and Person B
//   - List of shared expenses using ExpenseItem (update + remove)
//   - Add new custom expense via text input (Enter or button)
//   - All changes are written to Firestore in real-time

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Plus } from 'lucide-react'
import ExpenseItem from '../components/ExpenseItem'

export default function ExpensesPage({ household }) {
  const { data, updateData } = household
  const [newName, setNewName] = useState('')
  const expenses = data?.expenses || []

  const updateExpense = (id, amount) => {
    const updated = expenses.map((e) => (e.id === id ? { ...e, amount: Number(amount) } : e))
    updateData({ expenses: updated })
  }

  const removeExpense = (id) => {
    updateData({ expenses: expenses.filter((e) => e.id !== id) })
  }

  const addExpense = () => {
    if (!newName.trim()) return
    updateData({ expenses: [...expenses, { id: uuidv4(), name: newName.trim(), amount: 0 }] })
    setNewName('')
  }

  const updateIncome = (person, income) => {
    updateData({ [person]: { ...data[person], income: Number(income) } })
  }

  const total = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0)

  return (
    <div className="py-4 space-y-4">
      {/* Income inputs */}
      <div className="grid grid-cols-2 gap-3">
        {['personA', 'personB'].map((p) => (
          <div key={p} className="bg-white rounded-xl p-4 border">
            <p className="text-sm font-semibold text-gray-700 mb-2">{data[p]?.name}</p>
            <label className="text-xs text-gray-500 block mb-1">Månedslønn netto (kr)</label>
            <input
              type="number"
              className="input text-sm"
              value={data[p]?.income || ''}
              min="0"
              onChange={(e) => updateIncome(p, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Expense list */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Felles utgifter</h2>
          <span className="text-sm text-gray-500">{total.toLocaleString('nb-NO')} kr/mnd</span>
        </div>
        <div className="divide-y">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onUpdate={updateExpense}
              onRemove={removeExpense}
            />
          ))}
        </div>
        <div className="p-3 border-t flex gap-2">
          <input
            className="input flex-1 text-sm"
            placeholder="Legg til utgift..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addExpense()}
          />
          <button onClick={addExpense} className="btn-primary flex items-center gap-1 px-3">
            <Plus className="w-4 h-4" />
            Legg til
          </button>
        </div>
      </div>
    </div>
  )
}
