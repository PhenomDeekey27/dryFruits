import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createAdminSupabaseClient } from '@/lib/supabase-admin'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      totalAmount,
    } = await request.json()

    // Verify payment signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Use admin client to bypass RLS for order creation
    const admin = createAdminSupabaseClient()
    if (!admin) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    // Create order record
    const { data: order, error: orderError } = await admin
      .from('orders')
      .insert({
        user_id: user.id,
        total: totalAmount,
        status: 'processing',
        razorpay_order_id,
        razorpay_payment_id,
        payment_status: 'paid',
        currency: 'INR',
      })
      .select('id')
      .single()

    if (orderError || !order) {
      console.error('Order insert error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Insert order items
    const orderItems = cartItems.map((item: {
      products: { id: string; name: string; category: string }
      product_variants: { id: string; weight: string; price: number }
      quantity: number
    }) => ({
      order_id: order.id,
      product_id: item.products.id,
      variant_id: item.product_variants.id,
      product_name: item.products.name,
      variant_weight: item.product_variants.weight,
      price: item.product_variants.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await admin.from('order_items').insert(orderItems)

    if (itemsError) {
      console.error('Order items insert error:', itemsError)
    }

    // Clear the cart
    await admin.from('cart_items').delete().eq('user_id', user.id)

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (err) {
    console.error('Razorpay verify error:', err)
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
  }
}
