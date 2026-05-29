import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import Stripe from 'stripe'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })

const orderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().uuid(),
    variant_id: z.string().uuid().nullable(),
    quantity: z.number().int().positive(),
    unit_price: z.number().positive(),
  })),
  shipping: z.object({
    full_name: z.string(),
    phone: z.string(),
    address_line1: z.string(),
    address_line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postal_code: z.string(),
    country: z.string(),
  }),
  coupon_code: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = orderSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 })
  }

  const { items, shipping, coupon_code } = parsed.data

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shippingAmount = subtotal >= 500 ? 0 : 25
  let discountAmount = 0

  // Validate coupon
  if (coupon_code) {
    const { data: coupon } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', coupon_code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (coupon && (!coupon.valid_until || new Date(coupon.valid_until) > new Date())) {
      discountAmount = coupon.discount_type === 'percentage'
        ? subtotal * (coupon.discount_value / 100)
        : coupon.discount_value
    }
  }

  const totalAmount = subtotal + tax + shippingAmount - discountAmount

  // Fetch product details for snapshot
  const productIds = items.map(i => i.product_id)
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, images:product_images(url, is_primary)')
    .in('id', productIds)

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      subtotal,
      tax_amount: tax,
      shipping_amount: shippingAmount,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      coupon_code: coupon_code?.toUpperCase(),
      shipping_name: shipping.full_name,
      shipping_phone: shipping.phone,
      shipping_address1: shipping.address_line1,
      shipping_address2: shipping.address_line2,
      shipping_city: shipping.city,
      shipping_state: shipping.state,
      shipping_postal_code: shipping.postal_code,
      shipping_country: shipping.country,
      payment_status: 'pending',
    })
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }

  // Create order items
  const orderItems = items.map(item => {
    const product = products?.find(p => p.id === item.product_id)
    const primaryImage = (product?.images as { url: string; is_primary: boolean }[] | undefined)?.find(img => img.is_primary)?.url
    return {
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: product?.name ?? 'Unknown Product',
      product_image: primaryImage ?? null,
      sku: product?.sku ?? null,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
    }
  })

  await supabase.from('order_items').insert(orderItems)

  // Create Stripe Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: 'usd',
    metadata: { order_id: order.id, order_number: order.order_number },
    automatic_payment_methods: { enabled: true },
  })

  // Update order with payment intent
  await supabase
    .from('orders')
    .update({ stripe_payment_intent_id: paymentIntent.id })
    .eq('id', order.id)

  return NextResponse.json({
    order_id: order.id,
    order_number: order.order_number,
    client_secret: paymentIntent.client_secret,
    total: totalAmount,
  })
}

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: orders })
}
