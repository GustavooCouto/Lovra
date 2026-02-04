"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, Share2, Play, Pause, Music } from "lucide-react"

interface PhonePreviewProps {
  partnerName: string
  message: string
  theme: string
  relationship: string
}

const themeGradients: Record<string, string> = {
  pink: "from-pink-400/30 via-pink-500/20 to-rose-400/30",
  red: "from-red-400/30 via-rose-500/20 to-red-400/30",
  purple: "from-purple-400/30 via-fuchsia-500/20 to-purple-400/30",
  blue: "from-blue-400/30 via-cyan-500/20 to-blue-400/30",
  teal: "from-teal-400/30 via-emerald-500/20 to-teal-400/30",
}

const themeColors: Record<string, string> = {
  pink: "text-pink-400",
  red: "text-red-400",
  purple: "text-purple-400",
  blue: "text-blue-400",
  teal: "text-teal-400",
}

const themeBorders: Record<string, string> = {
  pink: "border-pink-400/50",
  red: "border-red-400/50",
  purple: "border-purple-400/50",
  blue: "border-blue-400/50",
  teal: "border-teal-400/50",
}

export function PhonePreview({ partnerName, message, theme, relationship }: PhonePreviewProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Simulated countdown (from a sample anniversary date)
  useEffect(() => {
    const anniversaryDate = new Date()
    anniversaryDate.setMonth(anniversaryDate.getMonth() - 6) // 6 months ago

    const updateCountdown = () => {
      const now = new Date()
      const diff = now.getTime() - anniversaryDate.getTime()
      
      const totalSeconds = Math.floor(diff / 1000)
      const d = Math.floor(totalSeconds / (24 * 60 * 60))
      const h = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
      const m = Math.floor((totalSeconds % (60 * 60)) / 60)
      const s = totalSeconds % 60

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const gradient = themeGradients[theme] || themeGradients.pink
  const textColor = themeColors[theme] || themeColors.pink
  const borderColor = themeBorders[theme] || themeBorders.pink

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
        
        {/* Phone Screen */}
        <div className={`w-full h-full rounded-[2.2rem] overflow-hidden bg-gradient-to-b ${gradient} relative`}>
          {/* Content */}
          <div className="absolute inset-0 p-6 pt-10 flex flex-col items-center overflow-y-auto">
            {/* Floating Hearts Animation */}
            <div className="absolute top-20 left-6 animate-bounce" style={{ animationDelay: "0s" }}>
              <Heart className={`w-4 h-4 ${textColor} fill-current opacity-60`} />
            </div>
            <div className="absolute top-32 right-8 animate-bounce" style={{ animationDelay: "0.5s" }}>
              <Heart className={`w-3 h-3 ${textColor} fill-current opacity-40`} />
            </div>
            <div className="absolute top-48 left-10 animate-bounce" style={{ animationDelay: "1s" }}>
              <Heart className={`w-5 h-5 ${textColor} fill-current opacity-50`} />
            </div>

            {/* Header */}
            <div className="text-center mb-6 mt-4">
              <p className="text-sm text-white/60 mb-1">Para você,</p>
              <h1 className={`text-3xl font-bold ${textColor}`}>{partnerName}</h1>
            </div>

            {/* Countdown Widget */}
            <div className={`w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border ${borderColor} mb-6`}>
              <p className="text-center text-white/60 text-sm mb-3">Juntos há</p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className={`text-2xl font-bold ${textColor}`}>{days}</div>
                  <div className="text-xs text-white/60">dias</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${textColor}`}>{hours}</div>
                  <div className="text-xs text-white/60">horas</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${textColor}`}>{minutes}</div>
                  <div className="text-xs text-white/60">min</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${textColor}`}>{seconds}</div>
                  <div className="text-xs text-white/60">seg</div>
                </div>
              </div>
            </div>

            {/* Photo Grid Placeholder */}
            <div className="w-full mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className={`aspect-square rounded-xl bg-white/10 border ${borderColor} flex items-center justify-center`}>
                  <Heart className={`w-8 h-8 ${textColor} opacity-30`} />
                </div>
                <div className={`aspect-square rounded-xl bg-white/10 border ${borderColor} flex items-center justify-center`}>
                  <Heart className={`w-8 h-8 ${textColor} opacity-30`} />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className={`w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border ${borderColor} mb-6`}>
              <p className="text-white/90 text-center font-serif italic leading-relaxed">
                {`"${message}"`}
              </p>
            </div>

            {/* Music Player Placeholder */}
            <div className={`w-full p-3 rounded-xl bg-white/10 backdrop-blur-sm border ${borderColor} flex items-center gap-3`}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ${textColor}`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div className="flex-1">
                <p className="text-white text-sm font-medium truncate">Nossa Música</p>
                <p className="text-white/60 text-xs">Adicione uma música especial</p>
              </div>
              <Music className={`w-5 h-5 ${textColor} opacity-60`} />
            </div>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Compartilhar Carta</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
              <div className="w-40 h-40 bg-black/10 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-center text-sm">
              Escaneie o QR Code ou copie o link abaixo
            </p>
            <div className="flex w-full gap-2">
              <input
                type="text"
                readOnly
                value="https://cartadigital.app/c/abc123"
                className="flex-1 px-3 py-2 rounded-lg bg-input border border-border text-sm text-foreground"
              />
              <Button variant="outline" size="sm">
                Copiar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
