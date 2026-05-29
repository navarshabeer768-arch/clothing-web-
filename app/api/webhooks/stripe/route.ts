import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Stripe webhook handler - configure STRIPE_SECRET_KEY in Vercel env vars to enable
    console.log('Webhook received:', body?.type)
    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ received: true })
  }
}
