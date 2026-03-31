import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage products, orders, and users',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar will be added here in next component */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
