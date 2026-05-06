import { Outlet } from 'react-router'
import { Header } from './Header'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
    </div>
  )
}
