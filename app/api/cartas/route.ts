import { NextRequest, NextResponse } from 'next/server'
import { cartasStore } from '@/lib/store'
import type { CartaData } from '@/lib/store'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    
    cartasStore[id] = {
      id,
      ...data,
      status: 'editing',
      createdAt: new Date().toISOString(),
    } as CartaData
    
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error saving carta:', error)
    return NextResponse.json({ error: 'Failed to save carta' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const all = searchParams.get('all')
  
  // Return all cartas for admin
  if (all === 'true') {
    return NextResponse.json(Object.values(cartasStore))
  }
  
  if (!id) {
    return NextResponse.json({ error: 'Carta ID required' }, { status: 400 })
  }
  
  const carta = cartasStore[id]
  
  if (!carta) {
    return NextResponse.json({ error: 'Carta not found' }, { status: 404 })
  }
  
  return NextResponse.json(carta)
}

// Update carta payment status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, isPaid, paymentId, status, amountPaid, plan } = body
    
    if (cartasStore[id]) {
      if (isPaid !== undefined) cartasStore[id].isPaid = isPaid
      if (paymentId !== undefined) cartasStore[id].paymentId = paymentId
      if (status !== undefined) cartasStore[id].status = status
      if (amountPaid !== undefined) cartasStore[id].amountPaid = amountPaid
      if (plan !== undefined) cartasStore[id].plan = plan
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Carta not found' }, { status: 404 })
  } catch (error) {
    console.error('Error updating carta:', error)
    return NextResponse.json({ error: 'Failed to update carta' }, { status: 500 })
  }
}
