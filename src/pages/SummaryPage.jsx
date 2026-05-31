// Created: 2026-01-14 10:00
// v9 - Initial file: SummaryPage component
// Purpose: Displays the proportional expense split between two people based on income ratio.
//   - Per-person card showing amount (kr) and percentage share
//   - Full itemized expense list
//   - ContributionChart (donut pie chart)
//   - ExportPanel for Excel and image download
//   - Split formula: shareA = incomeA / (incomeA + incomeB)

import { useRef } from 'react'
import ContributionChart from '../components/ContributionChart'
import ExportPanel from '../components/ExportPanel'

export default function SummaryPage({ household }) {
  const { data } = household
  const summaryRef = useRef(null)

  const incomeA = data?.personA?.income || 0
  const incomeB = data?.personB?.income || 0
  const totalIncome = incomeA + incomeB
  const shareA = totalIncome > 0 ? incomeA / totalIncome : 0.5
  const shareB = totalIncome > 0 ? incomeB / totalIncome : 0.5

  const expenses = data?.expenses || []
  const total = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0)
  const amountA = Math.round(total * shareA)
  const amountB = Math.round(total * shareB)

  const personCards = [
    { person: data?.personA, amount: amountA, share: shareA, ring: 'ring-rose-200', bg: 'bg-rose-50', text: 'text-rose-700' },
    { person: data?.personB, amount: amountB, share: shareB, ring: 'ring-purple-200', bg: 'bg-purple-50', text: 'text-purple-700' },
  ]

  return (
    <div className="py-4 space-y-4">
      <div ref={summaryRef} id="summary-card" className="space-y-3">
        {/* Per-person cards */}
        <div className="grid grid-cols-2 gap-3">
          {personCards.map(({ person, amount, share, ring, bg, text }) => (
            <div key={person?.name} className={`${bg} ring-1 ${ring} rounded-xl p-4`}>
              <p className={`font-semibold ${text} mb-1`}>{person?.name}</p>
              <p className="text-2xl font-bold text-gray-800">
                {amount.toLocaleString('nb-NO')}{' '}
                <span className="text-sm font-normal text-gray-500">kr</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">{(share * 100).toFixed(1)}% av totalen</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Inntekt: {(person?.income || 0).toLocaleString('nb-NO')} kr
              </p>
            </div>
          ))}
        </div>

        {/* Total + itemized list */}
        <div className="bg-white rounded-xl border p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800">Total felleskostnad</span>
            <span className="text-xl font-bold text-gray-800">
              {total.toLocaleString('nb-NO')} kr/mnd
            </span>
          </div>
          <div className="space-y-1.5">
            {expenses
              .filter((e) => Number(e.amount) > 0)
              .map((e) => (
                <div key={e.id} className="flex justify-between text-sm text-gray-600">
                  <span>{e.name}</span>
                  <span>{Number(e.amount).toLocaleString('nb-NO')} kr</span>
                </div>
              ))}
            {expenses.filter((e) => Number(e.amount) > 0).length === 0 && (
              <p className="text-sm text-gray-400 italic">Ingen utgifter lagt til ennå</p>
            )}
          </div>
        </div>

        {/* Chart */}
        <ContributionChart
          nameA={data?.personA?.name}
          nameB={data?.personB?.name}
          amountA={amountA}
          amountB={amountB}
        />
      </div>

      {/* Export buttons */}
      <ExportPanel
        data={data}
        total={total}
        amountA={amountA}
        amountB={amountB}
        shareA={shareA}
        shareB={shareB}
        summaryRef={summaryRef}
      />
    </div>
  )
}
