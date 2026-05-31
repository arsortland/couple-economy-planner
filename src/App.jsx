// v1.1 - Complete rewrite as Couple Economy Planner root component
// Purpose: Application root — manages tab navigation (SetupPage, ExpensesPage, SummaryPage)
//          and wraps household Firestore state via useHousehold hook.
import { useState } from 'react'
import { useHousehold } from './hooks/useHousehold'
import SetupPage from './pages/SetupPage'
import ExpensesPage from './pages/ExpensesPage'
import SummaryPage from './pages/SummaryPage'
import Navbar from './components/Navbar'

function App() {
  const household = useHousehold()
  const [page, setPage] = useState('expenses')

  if (!household.householdId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 flex items-center justify-center p-4">
        <SetupPage household={household} />
      </div>
    )
  }

  if (household.loading || !household.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-sm">Laster...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar page={page} setPage={setPage} household={household} />
      <main className="max-w-2xl mx-auto px-4 pb-24">
        {page === 'expenses' && <ExpensesPage household={household} />}
        {page === 'summary' && <SummaryPage household={household} />}
      </main>
    </div>
  )
}

export default App
