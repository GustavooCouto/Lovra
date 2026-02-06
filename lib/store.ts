// Shared in-memory store for the application
// In production, replace with a proper database (Supabase, Neon, etc.)

export interface CartaData {
  id: string
  partnerName: string
  senderName: string
  message: string
  selectedTheme: string
  selectedDecorations: string[]
  photos: string[]
  timelineMode: boolean
  timelineData?: Record<number, { caption: string; year: string }>
  musicUrl: string
  countdownEnabled: boolean
  togetherDate: string
  selectedRelationship: string
  email: string
  isPaid: boolean
  paymentId?: string
  amountPaid?: number
  plan?: string
  createdAt: string
  status: 'editing' | 'payment_pending' | 'paid' | 'completed'
}

export interface PriceConfig {
  planoUnico: number
  planoMensal: number
  extraPhotos: number
  timelinePerPhoto: number
  decoration: number
  themeChange: number
}

// Cartas store
export const cartasStore: Record<string, CartaData> = {}

// Price configuration
export const priceConfig: PriceConfig = {
  planoUnico: 17.89,
  planoMensal: 39.89,
  extraPhotos: 4.90,
  timelinePerPhoto: 2.50,
  decoration: 1.00,
  themeChange: 1.00,
}

// Admin credentials (in production, use proper hashed passwords in a database)
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lovra2026'
