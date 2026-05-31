// Created: 2026-01-14 10:00
// v8 - Initial file: ExportPanel component
// Purpose: Provides two export buttons for the summary screen:
//   - Excel (.xlsx): exports expense list + per-person split using the xlsx library
//   - Image (.png): captures the summary card using html2canvas and triggers download

import { Download, ImageIcon } from 'lucide-react'
import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'

export default function ExportPanel({ data, total, amountA, amountB, shareA, shareB, summaryRef }) {
  const exportExcel = () => {
    const rows = [
      ['Utgift', 'Beløp (kr)'],
      ...(data?.expenses || []).map((e) => [e.name, e.amount || 0]),
      [],
      ['Total', total],
      [],
      ['', 'Beløp (kr)', 'Andel (%)'],
      [data?.personA?.name, amountA, `${(shareA * 100).toFixed(1)}%`],
      [data?.personB?.name, amountB, `${(shareB * 100).toFixed(1)}%`],
    ]
    const ws = XLSX.utils.aoa_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Parøkonomi')
    XLSX.writeFile(wb, 'parokonomi.xlsx')
  }

  const exportImage = async () => {
    if (!summaryRef.current) return
    const canvas = await html2canvas(summaryRef.current, {
      scale: 2,
      backgroundColor: '#f9fafb',
    })
    const link = document.createElement('a')
    link.download = 'parokonomi.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={exportExcel}
        className="flex-1 btn-secondary flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Last ned Excel
      </button>
      <button
        onClick={exportImage}
        className="flex-1 btn-secondary flex items-center justify-center gap-2"
      >
        <ImageIcon className="w-4 h-4" />
        Last ned bilde
      </button>
    </div>
  )
}
