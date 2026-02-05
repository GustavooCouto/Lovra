import { NextRequest, NextResponse } from 'next/server'

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

// In-memory storage for demo (in production, use a database)
const paymentStatus: Record<string, { status: string; cartaId: string }> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mercado Pago sends different notification types
    if (body.type === 'payment') {
      const paymentId = body.data?.id
      
      if (paymentId && MERCADO_PAGO_ACCESS_TOKEN) {
        // Fetch payment details from Mercado Pago
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        })
        
        const payment = await response.json()
        
        // Store payment status with carta reference
        paymentStatus[paymentId] = {
          status: payment.status,
          cartaId: payment.external_reference,
        }
        
        console.log('Payment webhook received:', {
          paymentId,
          status: payment.status,
          cartaId: payment.external_reference,
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// GET endpoint to check payment status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('payment_id')
  
  if (!paymentId) {
    return NextResponse.json({ error: 'Payment ID required' }, { status: 400 })
  }

  // Check local cache first
  if (paymentStatus[paymentId]) {
    return NextResponse.json(paymentStatus[paymentId])
  }

  // Fetch from Mercado Pago API
  if (MERCADO_PAGO_ACCESS_TOKEN) {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      })
      
      const payment = await response.json()
      
      return NextResponse.json({
        status: payment.status,
        cartaId: payment.external_reference,
      })
    } catch (error) {
      console.error('Error fetching payment:', error)
    }
  }

  return NextResponse.json({ status: 'pending' })
}
