import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo (in production, use a database like Supabase or Neon)
const cartas: Record<string, {
  id: string
  partnerName: string
  senderName: string
  message: string
  selectedTheme: string
  selectedDecorations: string[]
  photos: string[]
  timelineMode: boolean
  musicUrl: string
  countdownEnabled: boolean
  togetherDate: string
  selectedRelationship: string
  email: string
  isPaid: boolean
  paymentId?: string
  createdAt: string
}> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    
    cartas[id] = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    }
    
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error('Error saving carta:', error)
    return NextResponse.json({ error: 'Failed to save carta' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json({ error: 'Carta ID required' }, { status: 400 })
  }
  
  const carta = cartas[id]
  
  if (!carta) {
    return NextResponse.json({ error: 'Carta not found' }, { status: 404 })
  }
  
  return NextResponse.json(carta)
}

// Update carta payment status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, isPaid, paymentId } = body
    
    if (cartas[id]) {
      cartas[id].isPaid = isPaid
      cartas[id].paymentId = paymentId
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Carta not found' }, { status: 404 })
  } catch (error) {
    console.error('Error updating carta:', error)
    return NextResponse.json({ error: 'Failed to update carta' }, { status: 500 })
  }
}
