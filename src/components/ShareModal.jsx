// Created: 2026-01-14 10:00
// v10 - Initial file: ShareModal component
// Purpose: Full-screen overlay modal displaying the household UUID.
//   - Copy to clipboard with a visual confirmation (icon swaps to Check for 2 seconds)
//   - Instruction text in Norwegian for the partner

import { useState } from 'react'
import { Copy, Check, X } from 'lucide-react'

export default function ShareModal({ householdId, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(householdId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-lg">Del husholdning</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Del denne ID-en med partneren din. De velger &quot;Bli med&quot; og limer inn koden.
        </p>

        <div className="bg-gray-50 rounded-lg px-3 py-2 font-mono text-xs text-gray-700 break-all">
          {householdId}
        </div>

        <button
          onClick={handleCopy}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Kopiert!' : 'Kopier ID'}
        </button>
      </div>
    </div>
  )
}
