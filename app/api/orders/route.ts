import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data: orders })
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { items, shipping } = body

  const subtotal = items.reduce((sum: number, item: { unit_price: number; quantity: number }) => sum + item.unit_price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shippingAmount = subtotal >= 500 ? 0 : 25
  const totalAmount = subtotal + tax + shippingAmount

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal,
      tax_amount: tax,
      shipping_amount: shippingAmount,
      discount_amount: 0,
      total_amount: totalAmount,
      shipping_name: shipping.full_name,
      shipping_phone: shipping.phone,
      shipping_address1: shipping.address_line1,
      shipping_city: shipping.city,
      shipping_state: shipping.state,
      shipping_postal_code: shipping.postal_code,
      shipping_country: shipping.country,
      payment_status: 'pending',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ order_id: order.id, order_number: order.order_number, total: totalAmount })
}
