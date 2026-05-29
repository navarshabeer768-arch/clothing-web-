'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})
type FormData = z.infer<typeof schema>

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      })

      if (signInError) {
        // Show the REAL error message from Supabase
        setError(`Auth error: ${signInError.message} (status: ${signInError.status})`)
        return
      }

      if (!authData?.user) {
        setError('Login failed — no user returned.')
        return
      }

      // Success — hard redirect
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect') || '/'
      window.location.href = redirect

    } catch (err: unknown) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-luxury-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/">
            <div className="text-3xl font-light tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)' }}>LUXÉ</div>
          </Link>
          <p className="text-muted-foreground text-sm mt-3 font-light">Welcome back</p>
        </div>

        <div className="bg-white rounded-sm shadow-luxury p-8">
          <h1 className="text-2xl font-light mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Sign In
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-sm mb-4 break-all">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Email Address</label>
              <input type="email" {...register('email')} placeholder="admin@admin.com"
                className="input-luxury" autoComplete="email" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium uppercase tracking-wider">Password</label>
              </div>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} {...register('password')}
                  placeholder="••••••••" className="input-luxury pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-black/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 rounded-sm">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-foreground font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
