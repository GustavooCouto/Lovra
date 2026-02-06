import { NextRequest, NextResponse } from 'next/server'
import { cartasStore, ADMIN_USERNAME, ADMIN_PASSWORD } from '@/lib/store'

const ADMIN_TOKEN = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64')

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  return token === ADMIN_TOKEN
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }
  
  const allCartas = Object.values(cartasStore)
  
  const stats = {
    totalCartas: allCartas.length,
    paidCartas: allCartas.filter(c => c.isPaid).length,
    editingCartas: allCartas.filter(c => !c.isPaid).length,
    totalRevenue: allCartas
      .filter(c => c.isPaid && c.amountPaid)
      .reduce((sum, c) => sum + (c.amountPaid || 0), 0),
    recentCartas: allCartas
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 50),
  }
  
  return NextResponse.json(stats)
}
