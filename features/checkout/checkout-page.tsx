'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ChevronRight, Lock, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import { formatPrice, cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const shippingSchema = z.object({
  email: z.string().email('Valid email required'),
  full_name: z.string().min(2, 'Name required'),
  phone: z.string().min(6, 'Phone required'),
  address_line1: z.string().min(3, 'Address required'),
  address_line2: z.string().optional(),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  postal_code: z.string().min(3, 'Postal code required'),
  country: z.string().min(2, 'Country required'),
})
type ShippingData = z.infer<typeof shippingSchema>

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation'

const STEPS: { id: Step; label: string }[] = [
  { id: 'cart', label: 'Cart' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' },
]

export function CheckoutPage() {
  const [step, setStep] = useState<Step>('shipping')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)

  const { items, getTotal, clearCart } = useCartStore()
  const subtotal = getTotal()
  const shipping = subtotal >= 500 ? 0 : 25
  const tax = subtotal * 0.08
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping + tax - discount

  const { register, handleSubmit, formState: { errors } } = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: 'US' },
  })

  const handleShippingSubmit = (data: ShippingData) => {
    setStep('payment')
  }

  const handlePayment = async () => {
    setProcessingPayment(true)
    // Simulate Stripe payment
    await new Promise(r => setTimeout(r, 2000))
    clearCart()
    setStep('confirmation')
    setProcessingPayment(false)
  }

  const currentStepIndex = STEPS.findIndex(s => s.id === step)

  return (
    <div className="min-h-screen bg-luxury-50">
      <div className="container-luxury py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-2xl font-light tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)' }}>
            LUXÉ
          </Link>
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Secure Checkout</span>
          </div>
        </div>

        {/* Progress steps */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-center mb-10">
            {STEPS.filter(s => s.id !== 'cart').map((s, i, arr) => {
              const sIdx = STEPS.findIndex(x => x.id === s.id)
              const done = sIdx < currentStepIndex
              const active = s.id === step
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all text-xs font-medium',
                      done ? 'bg-black border-black text-white' :
                        active ? 'border-black text-black' :
                          'border-luxury-200 text-luxury-300'
                    )}>
                      {done ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className={cn('text-[10px] uppercase tracking-wider', active ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                      {s.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={cn('w-16 md:w-24 h-px mx-3 mb-4 transition-colors', sIdx < currentStepIndex ? 'bg-black' : 'bg-luxury-200')} />
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {/* Shipping */}
              {step === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-sm shadow-luxury-sm p-6 md:p-8"
                >
                  <h2 className="text-lg font-medium mb-6">Shipping Information</h2>
                  <form onSubmit={handleSubmit(handleShippingSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Email Address *</label>
                        <input type="email" {...register('email')} className="input-luxury" placeholder="you@example.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input {...register('full_name')} className="input-luxury" placeholder="Your full name" />
                        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Phone *</label>
                        <input type="tel" {...register('phone')} className="input-luxury" placeholder="+1 (555) 000-0000" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Address Line 1 *</label>
                        <input {...register('address_line1')} className="input-luxury" placeholder="Street address" />
                        {errors.address_line1 && <p className="text-red-500 text-xs mt-1">{errors.address_line1.message}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Address Line 2</label>
                        <input {...register('address_line2')} className="input-luxury" placeholder="Apartment, suite, etc. (optional)" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">City *</label>
                        <input {...register('city')} className="input-luxury" placeholder="City" />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">State / Province *</label>
                        <input {...register('state')} className="input-luxury" placeholder="State" />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Postal Code *</label>
                        <input {...register('postal_code')} className="input-luxury" placeholder="ZIP / Postal" />
                        {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Country *</label>
                        <select {...register('country')} className="input-luxury">
                          {['US', 'GB', 'FR', 'DE', 'IT', 'JP', 'AU', 'CA', 'SG', 'HK', 'AE'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full py-4 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-black/90 transition-colors flex items-center justify-center gap-2 rounded-sm">
                        Continue to Payment <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Payment */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white rounded-sm shadow-luxury-sm p-6 md:p-8"
                >
                  <h2 className="text-lg font-medium mb-6">Payment Details</h2>

                  <div className="space-y-4">
                    {/* Card number */}
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Card Number</label>
                      <div className="input-luxury flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">•••• •••• •••• 4242</span>
                        <div className="flex gap-1">
                          {['VISA', 'MC'].map(b => (
                            <span key={b} className="text-[9px] border border-luxury-200 px-1.5 py-0.5 rounded-sm text-muted-foreground">{b}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Payments are securely processed by Stripe. Test card: 4242 4242 4242 4242
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Expiry Date</label>
                        <input className="input-luxury" placeholder="MM / YY" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">CVC</label>
                        <input className="input-luxury" placeholder="•••" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider mb-1.5">Cardholder Name</label>
                      <input className="input-luxury" placeholder="As shown on card" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handlePayment}
                      disabled={processingPayment}
                      className="w-full py-4 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-black/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                      {processingPayment ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                      ) : (
                        <><Lock className="h-4 w-4" /> Pay {formatPrice(total)}</>
                      )}
                    </button>
                    <button
                      onClick={() => setStep('shipping')}
                      className="w-full py-3 text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                    >
                      ← Back to shipping
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Confirmation */}
              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-sm shadow-luxury-sm p-8 md:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="h-10 w-10 text-green-600" />
                  </motion.div>
                  <h2 className="text-3xl font-light mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    Order Confirmed
                  </h2>
                  <p className="text-muted-foreground font-light mb-2">
                    Thank you for your purchase
                  </p>
                  <p className="text-sm font-mono text-gold-600 font-medium mb-8">LXE-010244</p>
                  <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
                    A confirmation email has been sent to your inbox. Your order will be carefully packaged and dispatched within 1–2 business days.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/account/orders" className="btn-luxury">
                      Track Order
                    </Link>
                    <Link href="/shop" className="btn-luxury-outline">
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order summary */}
          {step !== 'confirmation' && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-sm shadow-luxury-sm p-6 sticky top-24">
                <h3 className="text-sm font-medium mb-5">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 mb-5 max-h-64 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty</p>
                  ) : items.map(item => {
                    const price = item.variant?.price ?? item.product?.base_price ?? 0
                    const image = item.product?.images?.[0]?.url ?? ''
                    return (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-14 h-16 bg-luxury-50 rounded-sm overflow-hidden flex-shrink-0">
                          {image && <Image src={image} alt="" fill className="object-cover" />}
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{item.product?.name}</p>
                          {item.variant && <p className="text-[10px] text-muted-foreground">{item.variant.name}</p>}
                          <p className="text-xs font-medium mt-1">{formatPrice(price * item.quantity)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-5">
                  <input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2.5 text-xs bg-luxury-50 border border-luxury-200 focus:outline-none focus:border-luxury-400 rounded-sm"
                  />
                  <button
                    onClick={() => { if (couponCode.toUpperCase() === 'LUXE10') setCouponApplied(true) }}
                    className="px-4 py-2.5 text-xs font-medium border border-luxury-200 hover:border-black rounded-sm transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 mb-4">
                    <Check className="h-3.5 w-3.5" />
                    Code LUXE10 applied — 10% off
                  </div>
                )}

                {/* Totals */}
                <div className="space-y-2.5 text-sm border-t border-luxury-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-luxury-100 pt-3 flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="mt-5 pt-4 border-t border-luxury-100 flex items-center justify-center gap-1.5 text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span className="text-[10px] uppercase tracking-wider">SSL Encrypted · Secure Payment</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
