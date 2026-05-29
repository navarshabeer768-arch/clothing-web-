'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const schema = z.object({
  full_name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  newsletter: z.boolean().optional(),
})
type FormData = z.infer<typeof schema>

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { newsletter: true },
  })

  const password = watch('password', '')
  const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.full_name, newsletter_subscribed: data.newsletter },
        },
      })
      if (error) throw error
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-luxury-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-sm shadow-luxury p-10 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Account Created
          </h2>
          <p className="text-muted-foreground text-sm font-light mb-6">
            Please check your email to confirm your account. We&apos;ve sent a verification link to your inbox.
          </p>
          <Link href="/" className="btn-luxury inline-flex">
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-light tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)' }}>
              LUXÉ
            </div>
          </Link>
          <p className="text-muted-foreground text-sm mt-3 font-light">Join our exclusive circle</p>
        </div>

        <div className="bg-white rounded-sm shadow-luxury p-8">
          <h1 className="text-2xl font-light mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            Create Account
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                {...register('full_name')}
                placeholder="Your full name"
                className="input-luxury"
                autoComplete="name"
              />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="input-luxury"
                autoComplete="email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="At least 8 characters"
                  className="input-luxury pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password strength */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strength === 1 ? 'bg-red-400' : strength === 2 ? 'bg-yellow-400' : 'bg-green-400' : 'bg-luxury-200'}`}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1">
                    {strength === 1 ? 'Weak' : strength === 2 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register('newsletter')}
                className="mt-0.5 accent-black"
              />
              <span className="text-xs text-muted-foreground font-light leading-relaxed">
                Subscribe to our newsletter for exclusive collections, private sales, and style inspiration
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-black/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 rounded-sm"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Creating Account...</>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-[11px] text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-foreground">Terms</Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
            </p>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-foreground font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
