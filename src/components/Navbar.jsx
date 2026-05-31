// Created: 2026-01-14 10:00
// v11 - Initial file: Navbar component
// Purpose: Sticky top navigation bar for the app.
//   - Displays app title "Parøkonomi"
//   - "Del" button opens the ShareModal with the current household ID
//   - LogOut button calls leaveHousehold() to disconnect
//   - Tab navigation: Utgifter (expenses) and Sammendrag (summary)

import { useState } from 'react'
import { LayoutList, BarChart2, Share2, LogOut } from 'lucide-react'
import ShareModal from './ShareModal'

export default function Navbar({ page, setPage, household }) {
  const [showShare, setShowShare] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="text-lg font-bold text-rose-600">Parøkonomi</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShare(true)}
              className="btn-secondary flex items-center gap-1.5 text-xs py-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              Del
            </button>
            <button
              onClick={household.leaveHousehold}
              className="btn-secondary flex items-center gap-1.5 text-xs py-1.5"
              title="Forlat husholdning"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-2xl mx-auto px-4 flex gap-1 pb-2">
          {[
            { id: 'expenses', label: 'Utgifter', Icon: LayoutList },
            { id: 'summary', label: 'Sammendrag', Icon: BarChart2 },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                page === id
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </header>

      {showShare && (
        <ShareModal householdId={household.householdId} onClose={() => setShowShare(false)} />
      )}
    </>
  )
}
