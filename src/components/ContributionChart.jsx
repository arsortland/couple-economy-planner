// Created: 2026-01-14 10:00
// v7 - Initial file: ContributionChart component
// Purpose: Renders a Recharts donut pie chart showing each person's monetary contribution
//          to the shared expenses. Labels show name + amount in kr.

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#f43f5e', '#a855f7']

export default function ContributionChart({ nameA, nameB, amountA, amountB }) {
  const chartData = [
    { name: nameA || 'Person A', value: amountA },
    { name: nameB || 'Person B', value: amountB },
  ]

  return (
    <div className="bg-white rounded-xl border p-4 mt-3">
      <h3 className="font-semibold text-gray-800 mb-2">Fordeling</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${Number(v).toLocaleString('nb-NO')} kr`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
