import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '@/lib/store'

// Simple token for session validation (in production, use JWT or proper session management)
const ADMIN_TOKEN = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString('base64')

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin_token', ADMIN_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
      return response
    }
    
    return NextResponse.json({ error: 'Credenciais invalidas' }, { status: 401 })
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json({ error: 'Erro de autenticacao' }, { status: 500 })
  }
}

// Check auth status
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  
  if (token === ADMIN_TOKEN) {
    return NextResponse.json({ authenticated: true })
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

// Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('admin_token')
  return response
}
