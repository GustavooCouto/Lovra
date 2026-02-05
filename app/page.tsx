"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Heart,
  QrCode,
  Sparkles,
  Gift,
  Star,
  Shield,
  ChevronRight,
  Lock,
  Check,
  Music,
  Play,
  Pause,
  Clock,
} from "lucide-react"

const reviews = [
  {
    name: "Ana Paula",
    text: "Meu namorado amou! Chorou quando abriu o QR code.",
    rating: 5,
  },
  {
    name: "Lucas M.",
    text: "Melhor presente que ja dei. Super facil de fazer!",
    rating: 5,
  },
  {
    name: "Mariana S.",
    text: "Fiz em 5 minutos e ficou lindo demais!",
    rating: 5,
  },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    // Valentine's Day 2026 - June 12
    const valentines = new Date("2026-06-12T00:00:00")

    const update = () => {
      const now = new Date()
      const diff = valentines.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const blocks = [
    { value: timeLeft.days, label: "dias" },
    { value: timeLeft.hours, label: "horas" },
    { value: timeLeft.mins, label: "min" },
    { value: timeLeft.secs, label: "seg" },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 max-w-md">
      <div className="flex items-center justify-center gap-2 mb-4 text-primary">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">{"Valentine's Day em:"}</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        {blocks.map((b, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-secondary/80 border border-border flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-primary animate-count-glow">
                {String(b.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1.5">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhoneMockup() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [counter, setCounter] = useState({ days: 1587, hours: 22, mins: 44, secs: 43 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => {
        let { days, hours, mins, secs } = prev
        secs++
        if (secs >= 60) { secs = 0; mins++ }
        if (mins >= 60) { mins = 0; hours++ }
        if (hours >= 24) { hours = 0; days++ }
        return { days, hours, mins, secs }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative animate-float-hero">
      {/* Floating accent elements around phone */}
      <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-float-hero-slow">
        <Heart className="w-6 h-6 text-primary fill-primary" />
      </div>
      <div className="absolute top-1/3 -left-10 w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center animate-heart-float-2">
        <Heart className="w-5 h-5 text-primary fill-primary" />
      </div>
      <div className="absolute -bottom-4 -right-8 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center animate-heart-float-3">
        <Music className="w-5 h-5 text-primary" />
      </div>

      {/* Phone Frame */}
      <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] bg-black rounded-[2.5rem] md:rounded-[3rem] p-2.5 md:p-3 shadow-2xl shadow-primary/10 animate-glow-pulse">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-32 h-6 md:h-7 bg-black rounded-b-2xl z-20 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-800" />
          <div className="w-2 h-2 rounded-full bg-gray-800" />
        </div>

        {/* Screen */}
        <div className="w-full h-full rounded-[2rem] md:rounded-[2.2rem] overflow-hidden bg-gradient-to-b from-pink-950/80 via-rose-950/60 to-pink-950/80 relative">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-5 pt-2 text-white/60 text-xs">
            <span className="font-medium">19:44</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px]">ill</span>
              <span className="text-[10px]">Wi-Fi</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-5 pt-4 flex flex-col items-center overflow-y-auto h-[calc(100%-20px)]">
            {/* Counter Tabs */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs text-white/40 uppercase tracking-wider">Anos</span>
              <span className="text-xs text-primary uppercase tracking-wider font-medium">Meses</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">Dias</span>
            </div>

            {/* Timer */}
            <div className="bg-white/5 rounded-2xl border border-white/10 px-6 py-3 mb-3">
              <div className="flex items-center gap-1 text-white font-mono">
                <span className="text-2xl md:text-3xl font-bold">{counter.hours}</span>
                <span className="text-2xl md:text-3xl text-white/40">:</span>
                <span className="text-2xl md:text-3xl font-bold">{String(counter.mins).padStart(2, "0")}</span>
                <span className="text-2xl md:text-3xl text-white/40">:</span>
                <span className="text-2xl md:text-3xl font-bold">{String(counter.secs).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Days Together */}
            <p className="text-white/60 text-xs mb-4 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary/60" />
              {"Sao"} <strong className="text-white">{counter.days.toLocaleString()}</strong> {"dias de amor"}
              <Sparkles className="w-3 h-3 text-primary/60" />
            </p>

            {/* Floating Heart */}
            <div className="my-2">
              <Heart className="w-5 h-5 text-pink-400/60 fill-pink-400/60 animate-heart-pulse" />
            </div>

            {/* Music Card */}
            <div className="w-full mt-3 rounded-2xl bg-white/5 border border-white/10 p-3">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Heart className="w-3 h-3 fill-current" />
                <span className="text-xs font-medium text-white/80">Nossa Musica</span>
                <Heart className="w-3 h-3 fill-current" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-rose-800 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
                  MUSIC
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">Chuva de Arroz - Ao Vivo</p>
                  <p className="text-[10px] text-white/40 flex items-center gap-1">
                    <span className="bg-green-500 text-black px-1 py-px rounded text-[8px] font-bold">Pista</span>
                    Luan Santana
                  </p>
                  <p className="text-[10px] text-green-400/60 mt-0.5">+ Salvar no Spotify</p>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Loading ring placeholder */}
            <div className="my-4">
              <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-primary animate-spin" />
            </div>

            {/* Message Preview */}
            <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-white/80 text-xs leading-relaxed italic text-center">
                {"Obrigado por me fazer feliz cada dia mais! Voce e tudo que eu sempre quis e eu te amo"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute top-2/3 left-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      {/* Small floating hearts */}
      <Heart className="absolute top-[15%] left-[10%] w-3 h-3 text-primary/20 fill-primary/20 animate-heart-float-1" />
      <Heart className="absolute top-[25%] right-[15%] w-4 h-4 text-primary/15 fill-primary/15 animate-heart-float-2" />
      <Heart className="absolute top-[45%] left-[5%] w-2.5 h-2.5 text-primary/25 fill-primary/25 animate-heart-float-3" />
      <Heart className="absolute bottom-[30%] right-[8%] w-3 h-3 text-primary/20 fill-primary/20 animate-heart-float-4" />
      <Heart className="absolute bottom-[15%] left-[20%] w-2 h-2 text-primary/15 fill-primary/15 animate-heart-float-5" />
      <Heart className="absolute top-[60%] right-[25%] w-3.5 h-3.5 text-primary/10 fill-primary/10 animate-heart-float-6" />

      {/* Sparkle dots */}
      <div className="absolute top-[20%] right-[30%] w-1.5 h-1.5 bg-primary/30 rounded-full animate-twinkle" />
      <div className="absolute top-[40%] left-[15%] w-1 h-1 bg-accent/40 rounded-full animate-twinkle-delayed" />
      <div className="absolute bottom-[25%] right-[20%] w-1.5 h-1.5 bg-primary/20 rounded-full animate-sparkle" />
      <div className="absolute top-[70%] left-[40%] w-1 h-1 bg-primary/25 rounded-full animate-sparkle-delayed" />
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingParticles />

      {/* Header */}
      <header className="relative z-10 py-4 px-6 flex items-center justify-between">
        <div className="w-20" />
        <div className="flex items-center gap-2">
          <Heart className="w-7 h-7 text-primary fill-primary" />
          <span className="text-xl font-bold text-foreground tracking-tight">Lovra</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Seguro</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-8">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{"Especial Valentine's Day 2026"}</span>
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.1] text-balance font-serif">
                O presente que vai{" "}
                <span className="text-primary">
                  fazer chorar de amor
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-muted-foreground mb-3 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
                {"Neste Valentine's Day, surpreenda com algo unico: um site exclusivo com a historia de voces dois."}{" "}
                <span className="text-primary font-medium">
                  Crie em 5 minutos, emocione para sempre.
                </span>
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 lg:justify-start justify-center">
                <Link href="/criar">
                  <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl">
                    <Gift className="w-5 h-5 mr-2" />
                    Criar Minha Carta
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Pronto em 5 minutos
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-10">
                <CountdownTimer />
              </div>
            </div>

            {/* Right Column - Phone Mockup */}
            <div className="flex-shrink-0 relative">
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 font-serif text-balance">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Sparkles,
                title: "1. Personalize",
                desc: "Adicione fotos, mensagens, musica e escolha o tema perfeito",
              },
              {
                icon: QrCode,
                title: "2. Gere o QR Code",
                desc: "Um link unico e seguro e gerado para sua carta digital",
              },
              {
                icon: Heart,
                title: "3. Emocione",
                desc: "Envie o link ou QR Code e veja a magia acontecer",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-all hover:bg-card/80"
              >
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof */}
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              +2.847 cartas enviadas hoje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3 leading-relaxed">{`"${review.text}"`}</p>
                <p className="text-xs text-muted-foreground font-medium">- {review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-serif">
            Surpreenda quem voce ama
          </h2>
          <p className="text-muted-foreground mb-8">
            Crie uma carta digital unica em minutos e emocione de verdade.
          </p>
          <Link href="/criar">
            <Button size="lg" className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 rounded-xl">
              Comecar Agora
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>

          {/* Trust */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> Pagamento seguro
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4" /> Dados protegidos
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Satisfacao garantida
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>Lovra - Cartas de amor digitais</p>
      </footer>
    </div>
  )
}
