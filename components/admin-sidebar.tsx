'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toaster, toast } from 'sonner'

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: ShoppingCart },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Tickets', href: '/admin/tickets', icon: Ticket },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' })
      toast.success('Logged out')
      router.push('/admin/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  return (
    <>
      <Toaster />
      <div className={`${open ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 flex flex-col h-screen`}>
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {open && <h1 className="font-bold text-lg">Admin</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sidebar"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md hover:bg-secondary transition-colors text-left" aria-label={item.label}>
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {open && <span className="text-sm">{item.label}</span>}
                </button>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
            aria-label="Logout"
          >
            {open ? (
              <>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </>
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </>
  )
}
