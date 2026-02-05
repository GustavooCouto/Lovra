"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Heart, Star, Sparkles, Flower2, Music, Play, Pause, Volume2, VolumeX } from "lucide-react"

interface CartaData {
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
  isPaid: boolean
  createdAt: string
}

const themeColors: Record<string, { bg: string; text: string; border: string; gradient: string; accent: string }> = {
  red: { 
    bg: "bg-red-500/20", 
    text: "text-red-400", 
    border: "border-red-400/40", 
    gradient: "from-red-500/30 via-rose-500/20 to-red-500/30",
    accent: "bg-red-500"
  },
  pink: { 
    bg: "bg-pink-500/20", 
    text: "text-pink-400", 
    border: "border-pink-400/40", 
    gradient: "from-pink-500/30 via-rose-400/20 to-pink-500/30",
    accent: "bg-pink-500"
  },
  purple: { 
    bg: "bg-purple-500/20", 
    text: "text-purple-400", 
    border: "border-purple-400/40", 
    gradient: "from-purple-500/30 via-fuchsia-500/20 to-purple-500/30",
    accent: "bg-purple-500"
  },
  blue: { 
    bg: "bg-blue-400/20", 
    text: "text-blue-400", 
    border: "border-blue-400/40", 
    gradient: "from-blue-500/30 via-cyan-500/20 to-blue-500/30",
    accent: "bg-blue-400"
  },
  gold: { 
    bg: "bg-amber-500/20", 
    text: "text-amber-400", 
    border: "border-amber-400/40", 
    gradient: "from-amber-500/30 via-yellow-500/20 to-amber-500/30",
    accent: "bg-amber-500"
  },
}

export default function CartaPage() {
  const params = useParams()
  const cartaId = params.id as string
  
  const [carta, setCarta] = useState<CartaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const fetchCarta = async () => {
      try {
        // First try to fetch from API
        const response = await fetch(`/api/cartas?id=${cartaId}`)
        
        if (response.ok) {
          const data = await response.json()
          setCarta(data)
        } else {
          // Fallback to localStorage for demo
          const localData = localStorage.getItem(`carta_${cartaId}`)
          if (localData) {
            setCarta(JSON.parse(localData))
          } else {
            setError("Carta nao encontrada")
          }
        }
      } catch (err) {
        // Fallback to localStorage
        const localData = localStorage.getItem(`carta_${cartaId}`)
        if (localData) {
          setCarta(JSON.parse(localData))
        } else {
          setError("Erro ao carregar a carta")
        }
      } finally {
        setLoading(false)
      }
    }

    if (cartaId) {
      fetchCarta()
    }
  }, [cartaId])

  const daysTogether = useMemo(() => {
    if (!carta?.togetherDate) return 0
    const start = new Date(carta.togetherDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [carta?.togetherDate])

  const openEnvelope = () => {
    setIsEnvelopeOpen(true)
    setTimeout(() => setShowContent(true), 1500)
  }

  // Auto-rotate photos
  useEffect(() => {
    if (carta?.photos && carta.photos.length > 1 && showContent) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex(prev => (prev + 1) % carta.photos.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [carta?.photos, showContent])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-red-400 animate-pulse mx-auto mb-4" />
          <p className="text-white/60">Carregando sua carta...</p>
        </div>
      </div>
    )
  }

  if (error || !carta) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Carta nao encontrada</h1>
          <p className="text-white/60">O link pode ter expirado ou estar incorreto.</p>
        </div>
      </div>
    )
  }

  const theme = themeColors[carta.selectedTheme] || themeColors.red

  // Envelope screen
  if (!isEnvelopeOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        {/* Floating decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {carta.selectedDecorations.includes("hearts") && (
            <>
              <Heart className={`absolute top-[10%] left-[10%] w-6 h-6 ${theme.text} fill-current animate-float-slow opacity-60`} />
              <Heart className={`absolute top-[20%] right-[15%] w-4 h-4 ${theme.text} fill-current animate-float-medium opacity-40`} />
              <Heart className={`absolute bottom-[30%] right-[8%] w-7 h-7 ${theme.text} fill-current animate-float-slow opacity-70`} />
              <Heart className={`absolute bottom-[15%] left-[20%] w-3 h-3 ${theme.text} fill-current animate-float-medium opacity-30`} />
            </>
          )}
          {carta.selectedDecorations.includes("stars") && (
            <>
              <Star className={`absolute top-[15%] right-[20%] w-5 h-5 ${theme.text} fill-current animate-twinkle opacity-60`} />
              <Star className={`absolute bottom-[25%] right-[12%] w-6 h-6 ${theme.text} fill-current animate-twinkle opacity-70`} />
            </>
          )}
          {carta.selectedDecorations.includes("sparkles") && (
            <>
              <Sparkles className={`absolute top-[25%] left-[25%] w-5 h-5 ${theme.text} animate-sparkle opacity-60`} />
              <Sparkles className={`absolute bottom-[20%] left-[12%] w-6 h-6 ${theme.text} animate-sparkle opacity-70`} />
            </>
          )}
          {carta.selectedDecorations.includes("flowers") && (
            <>
              <Flower2 className={`absolute top-[18%] left-[18%] w-5 h-5 ${theme.text} animate-sway opacity-60`} />
              <Flower2 className={`absolute bottom-[28%] left-[22%] w-6 h-6 ${theme.text} animate-sway opacity-70`} />
            </>
          )}
        </div>

        <div className="text-center animate-in fade-in zoom-in duration-700">
          {/* Envelope */}
          <button 
            onClick={openEnvelope}
            className="relative mb-8 mx-auto w-64 h-48 cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
          >
            {/* Envelope body */}
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${theme.gradient} border-2 ${theme.border} shadow-2xl overflow-hidden`}>
              {/* Envelope flap */}
              <div 
                className={`absolute -top-1 left-0 right-0 h-24 bg-gradient-to-b ${theme.gradient} border-2 ${theme.border} rounded-t-lg group-hover:animate-envelope-peek`}
                style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
              />
              
              {/* Letter inside */}
              <div className="absolute inset-6 top-12 bg-white/90 rounded shadow-inner flex items-center justify-center">
                <div className="text-center p-4">
                  <Heart className={`w-8 h-8 mx-auto mb-2 ${theme.text.replace('text-', 'text-')} fill-current`} />
                  <p className="text-sm text-gray-600 font-medium">Para {carta.partnerName}</p>
                </div>
              </div>
            </div>
            
            {/* Floating hearts around envelope */}
            <Heart className={`absolute -top-6 -left-6 w-5 h-5 ${theme.text} fill-current animate-heart-float-1`} />
            <Heart className={`absolute -top-4 -right-8 w-4 h-4 ${theme.text} fill-current animate-heart-float-2`} />
            <Heart className={`absolute -bottom-4 -left-8 w-6 h-6 ${theme.text} fill-current animate-heart-float-3`} />
            <Heart className={`absolute -bottom-6 -right-6 w-3 h-3 ${theme.text} fill-current animate-heart-float-4`} />
          </button>

          <p className="text-white/60 text-sm mb-2">Voce recebeu uma carta especial</p>
          <p className={`${theme.text} text-lg font-medium`}>Toque para abrir</p>
        </div>
      </div>
    )
  }

  // Opening animation
  if (!showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="relative w-64 h-48 animate-envelope-open">
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${theme.gradient} border-2 ${theme.border} shadow-2xl`}>
            <div 
              className={`absolute -top-1 left-0 right-0 h-24 origin-top bg-gradient-to-b ${theme.gradient} border-2 ${theme.border} rounded-t-lg animate-flap-open`}
              style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
            />
            <div className="absolute inset-6 top-12 bg-white/90 rounded shadow-inner animate-letter-rise" />
          </div>
        </div>
      </div>
    )
  }

  // Full carta view
  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-y-auto`}>
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {carta.selectedDecorations.includes("hearts") && (
          <>
            <Heart className={`absolute top-[10%] left-[5%] w-6 h-6 ${theme.text} fill-current animate-float-slow opacity-40`} />
            <Heart className={`absolute top-[20%] right-[8%] w-4 h-4 ${theme.text} fill-current animate-float-medium opacity-30`} />
            <Heart className={`absolute top-[40%] left-[3%] w-5 h-5 ${theme.text} fill-current animate-float-fast opacity-35`} />
            <Heart className={`absolute bottom-[30%] right-[5%] w-7 h-7 ${theme.text} fill-current animate-float-slow opacity-45`} />
            <Heart className={`absolute bottom-[15%] left-[10%] w-3 h-3 ${theme.text} fill-current animate-float-medium opacity-25`} />
          </>
        )}
        {carta.selectedDecorations.includes("stars") && (
          <>
            <Star className={`absolute top-[15%] right-[15%] w-5 h-5 ${theme.text} fill-current animate-twinkle opacity-40`} />
            <Star className={`absolute top-[35%] left-[8%] w-4 h-4 ${theme.text} fill-current animate-twinkle-delayed opacity-35`} />
            <Star className={`absolute bottom-[25%] right-[10%] w-6 h-6 ${theme.text} fill-current animate-twinkle opacity-45`} />
          </>
        )}
        {carta.selectedDecorations.includes("sparkles") && (
          <>
            <Sparkles className={`absolute top-[25%] left-[15%] w-5 h-5 ${theme.text} animate-sparkle opacity-40`} />
            <Sparkles className={`absolute top-[50%] right-[5%] w-4 h-4 ${theme.text} animate-sparkle-delayed opacity-35`} />
            <Sparkles className={`absolute bottom-[20%] left-[8%] w-6 h-6 ${theme.text} animate-sparkle opacity-45`} />
          </>
        )}
        {carta.selectedDecorations.includes("flowers") && (
          <>
            <Flower2 className={`absolute top-[18%] left-[12%] w-5 h-5 ${theme.text} animate-sway opacity-40`} />
            <Flower2 className={`absolute top-[45%] right-[10%] w-4 h-4 ${theme.text} animate-sway-delayed opacity-35`} />
            <Flower2 className={`absolute bottom-[28%] left-[15%] w-6 h-6 ${theme.text} animate-sway opacity-45`} />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-white/50 text-sm mb-1">Uma carta especial para</p>
          <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>{carta.partnerName}</h1>
          {carta.senderName && (
            <p className="text-white/60 text-sm">De: {carta.senderName}</p>
          )}
        </div>

        {/* Countdown */}
        {carta.countdownEnabled && carta.togetherDate && daysTogether > 0 && (
          <div className={`mb-6 p-4 rounded-2xl ${theme.bg} border ${theme.border} text-center`}>
            <p className="text-white/60 text-sm mb-2">Juntos ha</p>
            <div className="flex justify-center items-baseline gap-2">
              <span className={`text-5xl font-bold ${theme.text}`}>{daysTogether}</span>
              <span className="text-white/80 text-lg">dias</span>
            </div>
            <p className="text-white/50 text-xs mt-2">de muito amor</p>
          </div>
        )}

        {/* Photos */}
        {carta.photos && carta.photos.length > 0 && (
          <div className="mb-6">
            {carta.timelineMode ? (
              // Timeline view
              <div className="relative pl-8">
                <div className={`absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b ${theme.gradient}`} />
                {carta.photos.map((photo, index) => (
                  <div key={index} className="relative mb-4 last:mb-0">
                    <div className={`absolute -left-5 top-4 w-4 h-4 rounded-full ${theme.accent} border-4 border-gray-900`} />
                    <div className={`rounded-2xl overflow-hidden border-2 ${theme.border} shadow-lg`}>
                      <div className="relative aspect-square">
                        <Image 
                          src={photo} 
                          alt={`Momento ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Carousel view
              <div className={`relative rounded-2xl overflow-hidden border-2 ${theme.border} shadow-lg`}>
                <div className="relative aspect-square">
                  <Image 
                    src={carta.photos[currentPhotoIndex]} 
                    alt={`Foto ${currentPhotoIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
                {carta.photos.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {carta.photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentPhotoIndex 
                            ? `${theme.accent} w-6` 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Message */}
        <div className={`p-6 rounded-2xl ${theme.bg} border ${theme.border} mb-6`}>
          <p className="text-white/90 text-center font-serif italic leading-relaxed text-lg whitespace-pre-wrap">
            &ldquo;{carta.message}&rdquo;
          </p>
        </div>

        {/* Music Player */}
        {carta.musicUrl && (
          <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} flex items-center gap-4`}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-12 h-12 rounded-full bg-white/20 flex items-center justify-center ${theme.text} hover:bg-white/30 transition-colors`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <div className="flex-1">
              <p className="text-white font-medium">Nossa Musica</p>
              <div className="w-full h-1 bg-white/20 rounded-full mt-2">
                <div className={`h-full ${theme.accent} rounded-full w-1/3`} />
              </div>
            </div>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`${theme.text} hover:text-white transition-colors`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <Heart className={`w-8 h-8 ${theme.text} fill-current mx-auto mb-2 animate-pulse`} />
          <p className="text-white/40 text-xs">Feito com amor no Lovra</p>
        </div>
      </div>
    </div>
  )
}
