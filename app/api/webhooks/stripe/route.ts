import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createAdminSupabaseClient()

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as { metadata?: { order_id?: string }; id: string }
    if (pi.metadata?.order_id) {
      await supabase.from('orders')
        .update({ status: 'paid', payment_status: 'paid', stripe_payment_intent_id: pi.id })
        .eq('id', pi.metadata.order_id)
    }
  }

  return NextResponse.json({ received: true })
}
