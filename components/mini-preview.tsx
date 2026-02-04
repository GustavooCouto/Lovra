"use client"

import { Heart, Music } from "lucide-react"

interface MiniPreviewProps {
  partnerName: string
  senderName?: string
  message: string
  theme: string
  photos?: string[]
}

const themeGradients: Record<string, string> = {
  red: "from-red-400/30 via-rose-500/20 to-red-400/30",
  pink: "from-pink-400/30 via-pink-500/20 to-rose-400/30",
  purple: "from-purple-400/30 via-fuchsia-500/20 to-purple-400/30",
  blue: "from-blue-400/30 via-cyan-500/20 to-blue-400/30",
  gold: "from-amber-400/30 via-yellow-500/20 to-amber-400/30",
}

const themeColors: Record<string, string> = {
  red: "text-red-400",
  pink: "text-pink-400",
  purple: "text-purple-400",
  blue: "text-blue-400",
  gold: "text-amber-400",
}

const themeBorders: Record<string, string> = {
  red: "border-red-400/40",
  pink: "border-pink-400/40",
  purple: "border-purple-400/40",
  blue: "border-blue-400/40",
  gold: "border-amber-400/40",
}

const themeBgs: Record<string, string> = {
  red: "bg-red-400/20",
  pink: "bg-pink-400/20",
  purple: "bg-purple-400/20",
  blue: "bg-blue-400/20",
  gold: "bg-amber-400/20",
}

export function MiniPreview({ partnerName, senderName, message, theme, photos }: MiniPreviewProps) {
  const gradient = themeGradients[theme] || themeGradients.red
  const textColor = themeColors[theme] || themeColors.red
  const borderColor = themeBorders[theme] || themeBorders.red
  const bgColor = themeBgs[theme] || themeBgs.red

  return (
    <div className="relative w-full max-w-[180px] mx-auto">
      {/* Mini Phone Frame */}
      <div className="relative w-full aspect-[9/18] bg-gray-900 rounded-2xl p-1 shadow-lg">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-gray-900 rounded-b-lg z-20" />
        
        {/* Phone Screen */}
        <div className={`w-full h-full rounded-xl overflow-hidden bg-gradient-to-b ${gradient} relative`}>
          <div className="absolute inset-0 p-2 pt-4 flex flex-col items-center overflow-hidden">
            {/* Floating Hearts */}
            <Heart 
              className={`absolute top-5 left-2 w-2 h-2 ${textColor} fill-current opacity-50 animate-bounce`} 
              style={{ animationDelay: "0s", animationDuration: "2s" }} 
            />
            <Heart 
              className={`absolute top-8 right-3 w-1.5 h-1.5 ${textColor} fill-current opacity-30 animate-bounce`} 
              style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} 
            />

            {/* Header */}
            <div className="text-center mb-2 mt-1">
              <p className="text-[7px] text-white/50">Para</p>
              <h1 className={`text-xs font-bold ${textColor} truncate max-w-[120px]`}>
                {partnerName || "..."}
              </h1>
            </div>

            {/* Photos Grid */}
            {photos && photos.length > 0 && (
              <div className="w-full mb-2">
                <div className="grid grid-cols-2 gap-0.5">
                  {photos.slice(0, 2).map((_, index) => (
                    <div 
                      key={index} 
                      className={`aspect-square rounded ${bgColor} border ${borderColor} flex items-center justify-center`}
                    >
                      <Heart className={`w-3 h-3 ${textColor} opacity-30`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Preview */}
            <div className={`w-full p-1.5 rounded-md ${bgColor} border ${borderColor} mb-2`}>
              <p className="text-white/80 text-center text-[6px] font-serif italic leading-tight line-clamp-3">
                {message ? `"${message.substring(0, 60)}..."` : '"Sua mensagem..."'}
              </p>
            </div>

            {/* Music Player Mini */}
            <div className={`w-full p-1.5 rounded-md ${bgColor} border ${borderColor} flex items-center gap-1.5`}>
              <div className={`w-4 h-4 rounded-full bg-white/10 flex items-center justify-center ${textColor}`}>
                <Music className="w-2 h-2" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full h-0.5 bg-white/20 rounded-full">
                  <div className={`w-1/3 h-full ${bgColor} rounded-full`} />
                </div>
              </div>
            </div>

            {/* Sender */}
            <div className="mt-auto pb-1 text-center">
              <p className="text-[6px] text-white/40">De</p>
              <p className={`text-[8px] font-medium ${textColor}`}>
                {senderName || "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
