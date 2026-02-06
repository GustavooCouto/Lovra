import { NextRequest, NextResponse } from 'next/server'
import { priceConfig, ADMIN_USERNAME, ADMIN_PASSWORD } from '@/lib/store'

const ADMIN_TOKEN = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64')

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  return token === ADMIN_TOKEN
}

// Get current prices
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }
  
  return NextResponse.json(priceConfig)
}

// Update prices
export async function PATCH(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Nao autorizado' }, { status: 401 })
  }
  
  try {
    const body = await request.json()
    
    if (body.planoUnico !== undefined) priceConfig.planoUnico = Number(body.planoUnico)
    if (body.planoMensal !== undefined) priceConfig.planoMensal = Number(body.planoMensal)
    if (body.extraPhotos !== undefined) priceConfig.extraPhotos = Number(body.extraPhotos)
    if (body.timelinePerPhoto !== undefined) priceConfig.timelinePerPhoto = Number(body.timelinePerPhoto)
    if (body.decoration !== undefined) priceConfig.decoration = Number(body.decoration)
    if (body.themeChange !== undefined) priceConfig.themeChange = Number(body.themeChange)
    
    return NextResponse.json({ success: true, prices: priceConfig })
  } catch (error) {
    console.error('Error updating prices:', error)
    return NextResponse.json({ error: 'Falha ao atualizar precos' }, { status: 500 })
  }
}
