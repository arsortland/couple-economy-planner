// Created: 2026-01-14 10:00
// v4 - Initial file: SetupPage component
// Purpose: First-screen onboarding — two tabs:
//   "Opprett ny": collect names + monthly net incomes for Person A & B, then calls createHousehold
//   "Bli med i eksisterende": accept a household UUID from a partner and calls joinHousehold

import { useState } from 'react'
import { Users } from 'lucide-react'

export default function SetupPage({ household }) {
  const [tab, setTab] = useState('create')
  const [form, setForm] = useState({ nameA: '', nameB: '', incomeA: '', incomeB: '' })
  const [joinId, setJoinId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.nameA || !form.nameB || !form.incomeA || !form.incomeB) {
      setError('Fyll inn alle felt')
      return
    }
    setLoading(true)
    setError('')
    try {
      await household.createHousehold(form.nameA, form.nameB, form.incomeA, form.incomeB)
    } catch {
      setError('Noe gikk galt. Prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async (e) => {
    e.preventDefault()
    if (!joinId.trim()) { setError('Skriv inn husholdnings-ID'); return }
    setLoading(true)
    setError('')
    try {
      await household.joinHousehold(joinId.trim())
    } catch {
      setError('Fant ikke husholdning. Sjekk ID-en og prøv igjen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
          <Users className="w-8 h-8 text-rose-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Parøkonomi</h1>
        <p className="text-gray-500 mt-1">Del utgifter rettferdig etter inntekt</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="flex border-b">
          {[['create', 'Opprett ny'], ['join', 'Bli med i eksisterende']].map(([t, label]) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError('') }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === t
                  ? 'text-rose-600 border-b-2 border-rose-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'create' ? (
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['nameA', 'Person A – Navn', 'Ola', 'text'],
                  ['incomeA', 'Person A – Lønn/mnd', '50000', 'number'],
                  ['nameB', 'Person B – Navn', 'Kari', 'text'],
                  ['incomeB', 'Person B – Lønn/mnd', '45000', 'number'],
                ].map(([key, label, placeholder, type]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <input
                      className="input"
                      type={type}
                      min={type === 'number' ? '0' : undefined}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Oppretter...' : 'Opprett husholdning'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Husholdnings-ID</label>
                <input
                  className="input font-mono text-sm"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  placeholder="Lim inn ID fra partner"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Kobler til...' : 'Bli med'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
