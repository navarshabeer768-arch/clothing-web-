'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function SettingsPage() {
  const [user, setUser] = useState<{ email: string; full_name?: string } | null>(null)
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/auth/login'); return }
      const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', authUser.id).single()
      const name = profile?.full_name ?? authUser.user_metadata?.full_name ?? ''
      setUser({ email: authUser.email ?? '', full_name: name })
      setFullName(name)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (authUser) {
      await supabase.from('profiles').update({ full_name: fullName }).eq('id', authUser.id)
      await supabase.auth.updateUser({ data: { full_name: fullName } })
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChangePassword = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (authUser?.email) {
      await supabase.auth.resetPasswordForEmail(authUser.email)
      alert('Password reset email sent!')
    }
  }

  if (loading) return <div className="min-h-screen bg-luxury-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-10 max-w-2xl">
        <Link href="/account" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Account
        </Link>
        <div className="mb-8">
          <p className="text-overline mb-1">My Account</p>
          <h1 className="text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>Settings</h1>
        </div>

        <div className="space-y-5">
          {/* Profile */}
          <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6">
            <h3 className="font-medium text-sm mb-5">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Full Name</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  className="input-luxury" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Email Address</label>
                <input type="email" value={user?.email ?? ''} disabled
                  className="input-luxury opacity-60 cursor-not-allowed" />
                <p className="text-xs text-muted-foreground mt-1">Email cannot be changed here.</p>
              </div>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-medium tracking-wider uppercase hover:bg-black/90 rounded-sm transition-colors disabled:opacity-50">
                {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...</>
                  : saved ? <><Check className="h-3.5 w-3.5" /> Saved!</>
                  : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="bg-white rounded-sm shadow-luxury-sm border border-luxury-100 p-6">
            <h3 className="font-medium text-sm mb-2">Password</h3>
            <p className="text-xs text-muted-foreground mb-4">We'll send a password reset link to your email.</p>
            <button onClick={handleChangePassword}
              className="px-6 py-3 border border-luxury-200 hover:border-black text-xs font-medium tracking-wider uppercase rounded-sm transition-colors">
              Send Reset Email
            </button>
          </div>

          {/* Danger zone */}
          <div className="bg-white rounded-sm shadow-luxury-sm border border-red-100 p-6">
            <h3 className="font-medium text-sm text-red-600 mb-2">Danger Zone</h3>
            <p className="text-xs text-muted-foreground mb-4">Sign out of your account on this device.</p>
            <button onClick={async () => { await createClient().auth.signOut(); window.location.href = '/' }}
              className="px-6 py-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium tracking-wider uppercase rounded-sm transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
