'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) return window.location.href = '/login'

      const res = await fetch('/api/v1/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
    } catch {
      console.error('Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  const chartData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 2000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
  ]

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <p className="text-3xl font-bold mt-2">${stats.totalRevenue.toLocaleString()}</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Products</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Users</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </main>
    </div>
  )
}
