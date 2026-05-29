import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminSupabaseClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const supabase = await createAdminSupabaseClient()

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent
      const orderId = pi.metadata?.order_id
      if (orderId) {
        await supabase
          .from('orders')
          .update({ status: 'paid', payment_status: 'paid', stripe_payment_intent_id: pi.id })
          .eq('id', orderId)
      }
      break
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent
      const orderId = pi.metadata?.order_id
      if (orderId) {
        await supabase
          .from('orders')
          .update({ payment_status: 'failed' })
          .eq('id', orderId)
      }
      break
    }
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge
      if (charge.payment_intent) {
        await supabase
          .from('orders')
          .update({ status: 'refunded', payment_status: 'refunded' })
          .eq('stripe_payment_intent_id', charge.payment_intent)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
