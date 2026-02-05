import { NextRequest, NextResponse } from 'next/server'

// Mercado Pago API
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      amount, 
      description, 
      email, 
      cartaId,
      cartaData 
    } = body

    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Mercado Pago access token not configured' },
        { status: 500 }
      )
    }

    // Create PIX payment with Mercado Pago
    const paymentData = {
      transaction_amount: amount,
      description: description || 'Carta de Amor Digital - Lovra',
      payment_method_id: 'pix',
      payer: {
        email: email,
      },
      external_reference: cartaId,
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://lovra.vercel.app'}/api/mercadopago/webhook`,
    }

    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        'X-Idempotency-Key': `${cartaId}-${Date.now()}`,
      },
      body: JSON.stringify(paymentData),
    })

    const payment = await response.json()

    if (!response.ok) {
      console.error('Mercado Pago error:', payment)
      return NextResponse.json(
        { error: payment.message || 'Erro ao criar pagamento' },
        { status: response.status }
      )
    }

    // Return PIX data
    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      qr_code: payment.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64: payment.point_of_interaction?.transaction_data?.qr_code_base64,
      ticket_url: payment.point_of_interaction?.transaction_data?.ticket_url,
      cartaId: cartaId,
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Erro interno ao processar pagamento' },
      { status: 500 }
    )
  }
}
