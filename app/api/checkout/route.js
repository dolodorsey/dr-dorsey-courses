import { NextResponse } from 'next/server'

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY

export async function POST(request) {
  try {
    const { priceId, mode, programKey } = await request.json()
    
    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || 'https://youtube-university.vercel.app'

    const params = new URLSearchParams()
    params.append('line_items[0][price]', priceId)
    params.append('line_items[0][quantity]', '1')
    params.append('mode', mode || 'payment')
    params.append('success_url', `${origin}/?success=true&program=${programKey || ''}`)
    params.append('cancel_url', `${origin}/?canceled=true`)
    params.append('allow_promotion_codes', 'true')
    
    if (mode === 'subscription') {
      params.append('subscription_data[metadata][program_key]', programKey || '')
      params.append('subscription_data[metadata][source]', 'dr_dorsey_courses')
    } else {
      params.append('payment_intent_data[metadata][program_key]', programKey || '')
      params.append('payment_intent_data[metadata][source]', 'dr_dorsey_courses')
    }

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(STRIPE_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    })

    const session = await response.json()
    
    if (session.error) {
      return NextResponse.json({ error: session.error.message }, { status: 400 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
