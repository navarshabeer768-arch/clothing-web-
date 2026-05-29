'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, MapPin, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function AddressesPage() {
  const [addresses, setAddresses] = useState<{ id: string; label: string; full_name: string; address_line1: string; city: string; country: string; is_default: boolean }[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      const { data } = await supabase.from('addresses').select('*').eq('user_id', user.id).order('is_default', { ascending: false })
      setAddresses(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="min-h-screen bg-luxury-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-10 max-w-2xl">
        <Link href="/account" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Account
        </Link>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-overline mb-1">My Account</p>
            <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>Addresses</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-medium tracking-wider uppercase rounded-sm hover:bg-black/90 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add Address
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-12 text-center">
            <MapPin className="h-10 w-10 text-luxury-300 mx-auto mb-4" />
            <h3 className="text-lg font-light mb-2" style={{ fontFamily: 'var(--font-display)' }}>No addresses saved</h3>
            <p className="text-sm text-muted-foreground mb-6">Add a shipping address for faster checkout.</p>
            <button className="btn-luxury inline-flex items-center gap-2 text-xs">
              <Plus className="h-3.5 w-3.5" /> Add New Address
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses.map(addr => (
              <div key={addr.id} className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wider">{addr.label}</span>
                    {addr.is_default && <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-[10px] rounded-sm uppercase tracking-wider">Default</span>}
                  </div>
                  <p className="text-sm font-medium">{addr.full_name}</p>
                  <p className="text-xs text-muted-foreground">{addr.address_line1}, {addr.city}, {addr.country}</p>
                </div>
                <button className="p-1.5 hover:bg-red-50 rounded-sm transition-colors">
                  <Trash2 className="h-3.5 w-3.5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
