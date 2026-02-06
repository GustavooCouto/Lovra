"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Heart, Star, Sparkles, Flower2, Music, Play, Pause, Volume2, VolumeX, Share2, Copy, ExternalLink } from "lucide-react"

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

const themeColors: Record<string, { bg: string; text: string; border: string; gradient: string; accent: string; glow: string }> = {
  red: { 
    bg: "bg-red-500/15", 
    text: "text-red-400", 
    border: "border-red-400/30", 
    gradient: "from-red-500/20 via-rose-500/10 to-red-500/20",
    accent: "bg-red-500",
    glow: "shadow-red-500/20"
  },
  pink: { 
    bg: "bg-pink-500/15", 
    text: "text-pink-400", 
    border: "border-pink-400/30", 
    gradient: "from-pink-500/20 via-rose-400/10 to-pink-500/20",
    accent: "bg-pink-500",
    glow: "shadow-pink-500/20"
  },
  purple: { 
    bg: "bg-purple-500/15", 
    text: "text-purple-400", 
    border: "border-purple-400/30", 
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-purple-500/20",
    accent: "bg-purple-500",
    glow: "shadow-purple-500/20"
  },
  blue: { 
    bg: "bg-blue-400/15", 
    text: "text-blue-400", 
    border: "border-blue-400/30", 
    gradient: "from-blue-500/20 via-cyan-500/10 to-blue-500/20",
    accent: "bg-blue-400",
    glow: "shadow-blue-400/20"
  },
  gold: { 
    bg: "bg-amber-500/15", 
    text: "text-amber-400", 
    border: "border-amber-400/30", 
    gradient: "from-amber-500/20 via-yellow-500/10 to-amber-500/20",
    accent: "bg-amber-500",
    glow: "shadow-amber-500/20"
  },
}

function PolaroidPhoto({ src, alt, rotation, className = "" }: { src: string; alt: string; rotation: string; className?: string }) {
  return (
    <div className={`bg-white p-2 pb-10 rounded-sm shadow-xl ${rotation} hover:rotate-0 transition-transform duration-500 ${className}`}>
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

function ShareModal({ isOpen, onClose, cartaLink, theme }: { isOpen: boolean; onClose: () => void; cartaLink: string; theme: typeof themeColors.red }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cartaLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-white mb-4 text-center">Compartilhar carta</h3>
        
        {/* QR Code */}
        <div className="flex justify-center mb-5">
          <div className="bg-white p-3 rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(cartaLink)}&margin=0`}
              alt="QR Code da carta"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>
        </div>
        <p className="text-center text-white/60 text-sm mb-4">Escaneie o QR Code ou copie o link</p>

        {/* Link */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            readOnly
            value={cartaLink}
            className="flex-1 px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white/80 truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              copied ? "bg-green-500/20 text-green-400" : `${theme.bg} ${theme.text}`
            }`}
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  )
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
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    const fetchCarta = async () => {
      try {
        const response = await fetch(`/api/cartas?id=${cartaId}`)
        
        if (response.ok) {
          const data = await response.json()
          setCarta(data)
        } else {
          const localData = localStorage.getItem(`carta_${cartaId}`)
          if (localData) {
            setCarta(JSON.parse(localData))
          } else {
            setError("Carta nao encontrada")
          }
        }
      } catch {
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

  const cartaLink = typeof window !== "undefined" ? window.location.href : ""

  const openEnvelope = () => {
    setIsEnvelopeOpen(true)
    setTimeout(() => setShowContent(true), 1500)
  }

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
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-10 h-10 text-red-400/60 animate-pulse mx-auto mb-4" />
          <p className="text-white/40 text-sm">Carregando sua carta...</p>
        </div>
      </div>
    )
  }

  if (error || !carta) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="w-10 h-10 text-gray-600 mx-auto mb-4" />
          <h1 className="text-lg font-bold text-white mb-2">Carta nao encontrada</h1>
          <p className="text-white/40 text-sm">O link pode ter expirado ou estar incorreto.</p>
        </div>
      </div>
    )
  }

  const theme = themeColors[carta.selectedTheme] || themeColors.red
  const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"]

  // Envelope screen
  if (!isEnvelopeOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {carta.selectedDecorations.includes("hearts") && (
            <>
              <Heart className={`absolute top-[10%] left-[10%] w-5 h-5 ${theme.text} fill-current animate-float-slow opacity-40`} />
              <Heart className={`absolute top-[20%] right-[15%] w-3.5 h-3.5 ${theme.text} fill-current animate-float-medium opacity-25`} />
              <Heart className={`absolute bottom-[30%] right-[8%] w-6 h-6 ${theme.text} fill-current animate-float-slow opacity-35`} />
            </>
          )}
          {carta.selectedDecorations.includes("stars") && (
            <>
              <Star className={`absolute top-[15%] right-[20%] w-4 h-4 ${theme.text} fill-current animate-twinkle opacity-40`} />
              <Star className={`absolute bottom-[25%] right-[12%] w-5 h-5 ${theme.text} fill-current animate-twinkle opacity-35`} />
            </>
          )}
          {carta.selectedDecorations.includes("sparkles") && (
            <>
              <Sparkles className={`absolute top-[25%] left-[25%] w-4 h-4 ${theme.text} animate-sparkle opacity-40`} />
              <Sparkles className={`absolute bottom-[20%] left-[12%] w-5 h-5 ${theme.text} animate-sparkle opacity-35`} />
            </>
          )}
          {carta.selectedDecorations.includes("flowers") && (
            <>
              <Flower2 className={`absolute top-[18%] left-[18%] w-4 h-4 ${theme.text} animate-sway opacity-40`} />
              <Flower2 className={`absolute bottom-[28%] left-[22%] w-5 h-5 ${theme.text} animate-sway opacity-35`} />
            </>
          )}
        </div>

        <div className="text-center animate-in fade-in zoom-in duration-700">
          <button 
            onClick={openEnvelope}
            className="relative mb-8 mx-auto w-64 h-48 cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${theme.gradient} border ${theme.border} shadow-2xl ${theme.glow} overflow-hidden`}>
              <div 
                className={`absolute -top-1 left-0 right-0 h-24 bg-gradient-to-b ${theme.gradient} border ${theme.border} rounded-t-xl group-hover:animate-envelope-peek`}
                style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
              />
              <div className="absolute inset-6 top-12 bg-white/90 rounded shadow-inner flex items-center justify-center">
                <div className="text-center p-4">
                  <Heart className={`w-7 h-7 mx-auto mb-2 ${theme.text} fill-current`} />
                  <p className="text-sm text-gray-600 font-medium">Para {carta.partnerName}</p>
                </div>
              </div>
            </div>
          </button>

          <p className="text-white/40 text-sm mb-2">Voce recebeu uma carta especial</p>
          <p className={`${theme.text} text-lg font-medium`}>Toque para abrir</p>
        </div>
      </div>
    )
  }

  // Opening animation
  if (!showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
        <div className="relative w-64 h-48 animate-envelope-open">
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${theme.gradient} border ${theme.border} shadow-2xl`}>
            <div 
              className={`absolute -top-1 left-0 right-0 h-24 origin-top bg-gradient-to-b ${theme.gradient} border ${theme.border} rounded-t-xl animate-flap-open`}
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-y-auto">
      {/* Floating decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {carta.selectedDecorations.includes("hearts") && (
          <>
            <Heart className={`absolute top-[10%] left-[5%] w-5 h-5 ${theme.text} fill-current animate-float-slow opacity-20`} />
            <Heart className={`absolute top-[20%] right-[8%] w-3.5 h-3.5 ${theme.text} fill-current animate-float-medium opacity-15`} />
            <Heart className={`absolute top-[40%] left-[3%] w-4 h-4 ${theme.text} fill-current animate-float-fast opacity-18`} />
            <Heart className={`absolute bottom-[30%] right-[5%] w-6 h-6 ${theme.text} fill-current animate-float-slow opacity-22`} />
          </>
        )}
        {carta.selectedDecorations.includes("stars") && (
          <>
            <Star className={`absolute top-[15%] right-[15%] w-4 h-4 ${theme.text} fill-current animate-twinkle opacity-20`} />
            <Star className={`absolute bottom-[25%] right-[10%] w-5 h-5 ${theme.text} fill-current animate-twinkle opacity-22`} />
          </>
        )}
        {carta.selectedDecorations.includes("sparkles") && (
          <>
            <Sparkles className={`absolute top-[25%] left-[15%] w-4 h-4 ${theme.text} animate-sparkle opacity-20`} />
            <Sparkles className={`absolute bottom-[20%] left-[8%] w-5 h-5 ${theme.text} animate-sparkle opacity-22`} />
          </>
        )}
        {carta.selectedDecorations.includes("flowers") && (
          <>
            <Flower2 className={`absolute top-[18%] left-[12%] w-4 h-4 ${theme.text} animate-sway opacity-20`} />
            <Flower2 className={`absolute bottom-[28%] left-[15%] w-5 h-5 ${theme.text} animate-sway opacity-22`} />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Share button fixed */}
        <button
          onClick={() => setShowShare(true)}
          className={`fixed top-5 right-5 z-20 w-10 h-10 rounded-full ${theme.bg} border ${theme.border} flex items-center justify-center backdrop-blur-sm`}
        >
          <Share2 className={`w-4 h-4 ${theme.text}`} />
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Uma carta especial para</p>
          <h1 className={`text-4xl md:text-5xl font-bold ${theme.text} mb-3 font-serif`}>{carta.partnerName}</h1>
          {carta.senderName && (
            <p className="text-white/40 text-sm">Com amor, {carta.senderName}</p>
          )}
        </div>

        {/* Countdown */}
        {carta.countdownEnabled && carta.togetherDate && daysTogether > 0 && (
          <div className={`mb-8 p-5 rounded-2xl ${theme.bg} border ${theme.border} text-center`}>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Juntos ha</p>
            <div className="flex justify-center items-baseline gap-2">
              <span className={`text-5xl font-bold ${theme.text} font-serif`}>{daysTogether.toLocaleString()}</span>
              <span className="text-white/60 text-lg">dias</span>
            </div>
            <p className="text-white/30 text-xs mt-2">de muito amor</p>
          </div>
        )}

        {/* Photos - Polaroid Style */}
        {carta.photos && carta.photos.length > 0 && (
          <div className="mb-8">
            {carta.timelineMode ? (
              // Timeline view with polaroid cards
              <div className="relative pl-10">
                <div className={`absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b ${theme.gradient}`} />
                {carta.photos.map((photo, index) => (
                  <div key={index} className="relative mb-8 last:mb-0">
                    <div className={`absolute left-[-26px] top-6 w-3 h-3 rounded-full ${theme.accent} border-4 border-gray-900 shadow-lg ${theme.glow}`} />
                    <PolaroidPhoto
                      src={photo}
                      alt={`Momento ${index + 1}`}
                      rotation={rotations[index % rotations.length]}
                      className={`max-w-[260px] shadow-2xl ${theme.glow}`}
                    />
                  </div>
                ))}
              </div>
            ) : carta.photos.length === 1 ? (
              // Single photo - centered polaroid
              <div className="flex justify-center">
                <PolaroidPhoto
                  src={carta.photos[0]}
                  alt="Nossa foto"
                  rotation="rotate-1"
                  className={`max-w-[280px] shadow-2xl ${theme.glow}`}
                />
              </div>
            ) : carta.photos.length === 2 ? (
              // Two photos - overlapping polaroids
              <div className="relative flex justify-center items-center min-h-[300px]">
                <PolaroidPhoto
                  src={carta.photos[0]}
                  alt="Foto 1"
                  rotation="-rotate-6"
                  className={`absolute left-4 md:left-8 w-[200px] shadow-2xl ${theme.glow} z-10`}
                />
                <PolaroidPhoto
                  src={carta.photos[1]}
                  alt="Foto 2"
                  rotation="rotate-4"
                  className={`absolute right-4 md:right-8 w-[200px] shadow-2xl ${theme.glow} z-20`}
                />
              </div>
            ) : (
              // Multiple photos - scattered polaroid collage with carousel indicator
              <div className="space-y-4">
                <div className={`relative rounded-2xl overflow-hidden border ${theme.border} shadow-2xl ${theme.glow}`}>
                  <div className="relative aspect-[4/5]">
                    <Image 
                      src={carta.photos[currentPhotoIndex]} 
                      alt={`Foto ${currentPhotoIndex + 1}`}
                      fill
                      className="object-cover transition-opacity duration-700"
                    />
                    {/* Soft vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    
                    {/* Photo counter */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {carta.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentPhotoIndex 
                              ? `${theme.accent} w-8` 
                              : 'bg-white/40 w-1.5 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Message */}
        <div className={`p-7 rounded-2xl ${theme.bg} border ${theme.border} mb-8`}>
          <Heart className={`w-5 h-5 ${theme.text} fill-current mx-auto mb-4 opacity-60`} />
          <p className="text-white/85 text-center font-serif italic leading-relaxed text-lg whitespace-pre-wrap">
            &ldquo;{carta.message}&rdquo;
          </p>
        </div>

        {/* Music Player */}
        {carta.musicUrl && (
          <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} flex items-center gap-4 mb-8`}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-11 h-11 rounded-full bg-white/10 flex items-center justify-center ${theme.text} hover:bg-white/20 transition-colors shrink-0`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 font-medium text-sm">Nossa Musica</p>
              <div className="w-full h-1 bg-white/10 rounded-full mt-2">
                <div className={`h-full ${theme.accent} rounded-full w-1/3 transition-all`} />
              </div>
            </div>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`${theme.text} hover:text-white transition-colors shrink-0`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pb-6">
          <Heart className={`w-6 h-6 ${theme.text} fill-current mx-auto mb-3 animate-pulse opacity-40`} />
          <p className="text-white/20 text-xs">Feito com amor no Lovra</p>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        cartaLink={cartaLink}
        theme={theme}
      />
    </div>
  )
}
