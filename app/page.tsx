"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Sparkles,
  Gift,
  Star,
  Shield,
  ChevronRight,
  Lock,
  Check,
  Clock,
  Pen,
  ImageIcon,
  Send,
} from "lucide-react"

const reviews = [
  {
    name: "Ana Paula",
    text: "Meu namorado amou! Chorou quando abriu o QR code. A melhor surpresa que ja preparei.",
    rating: 5,
    initial: "A",
  },
  {
    name: "Lucas M.",
    text: "Melhor presente que ja dei. Super facil de fazer e ficou muito profissional!",
    rating: 5,
    initial: "L",
  },
  {
    name: "Mariana S.",
    text: "Fiz em 5 minutos e ficou lindo demais! Minha esposa amou cada detalhe.",
    rating: 5,
    initial: "M",
  },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
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
    <div className="flex items-center gap-3">
      {blocks.map((b, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm">
            <span className="text-xl md:text-2xl font-bold text-primary font-serif">
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground mt-1.5 font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  )
}

const steps = [
  {
    icon: Pen,
    title: "Escreva",
    desc: "Coloque em palavras o que voce sente. Use nossas sugestoes ou escreva do seu jeito.",
    num: "01",
  },
  {
    icon: ImageIcon,
    title: "Personalize",
    desc: "Adicione fotos especiais, escolha um tema e inclua a musica de voces.",
    num: "02",
  },
  {
    icon: Send,
    title: "Envie",
    desc: "Compartilhe por link ou QR Code e veja a magia acontecer.",
    num: "03",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle warm texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-5 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-4.5 h-4.5 text-primary-foreground fill-current" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Lovra</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Seguro</span>
            </div>
            <Link href="/criar">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-10 px-5 text-sm font-medium shadow-sm">
                Criar Carta
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-24 pb-16 md:pb-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-8 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{"Dia dos Namorados 2026 chegando"}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.08] text-balance font-serif">
              Transforme seus sentimentos em um{" "}
              <span className="text-primary italic">presente inesquecivel</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed text-pretty">
              Crie uma carta digital personalizada com fotos, musica e uma mensagem unica.
              Pronto em 5 minutos, emociona para sempre.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link href="/criar">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-md font-medium"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Criar Minha Carta
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary/60" />
                Pronto em 5 minutos
              </p>
            </div>

            {/* Countdown */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
                {"Dia dos Namorados em:"}
              </p>
              <CountdownTimer />
            </div>
          </div>
        </section>

        {/* Social proof bar */}
        <section className="border-y border-border bg-card/60">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-foreground font-serif">10.000+</span>
                <span className="text-sm text-muted-foreground">Casais felizes</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border" />
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-bold text-foreground font-serif">50.000+</span>
                <span className="text-sm text-muted-foreground">Cartas criadas</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-border" />
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <span className="text-2xl md:text-3xl font-bold text-foreground font-serif">4.9</span>
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <span className="text-sm text-muted-foreground">Avaliacao media</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Como funciona</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
              Tres passos simples para emocionar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-3xl p-8 transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-serif text-primary/40 font-bold">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-serif">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-card/60 border-y border-border">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif text-balance">
                Historias que aquecem o coracao
              </h2>
              <p className="text-sm text-muted-foreground mt-3">
                +2.847 cartas enviadas hoje
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{review.initial}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{`"${review.text}"`}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="relative bg-card border border-border rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-6 left-8 opacity-10">
              <Heart className="w-16 h-16 text-primary fill-primary" />
            </div>
            <div className="absolute bottom-6 right-8 opacity-10">
              <Heart className="w-12 h-12 text-primary fill-primary" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif text-balance">
                Surpreenda quem voce ama
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Crie uma carta digital unica em minutos. Cada detalhe pensado para emocionar de verdade.
              </p>
              <Link href="/criar">
                <Button
                  size="lg"
                  className="h-14 px-10 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-md font-medium"
                >
                  Comecar Agora
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>

              {/* Trust */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
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
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm text-muted-foreground border-t border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-primary-foreground fill-current" />
            </div>
            <span className="font-bold text-foreground">Lovra</span>
          </div>
          <p>Cartas de amor digitais feitas com carinho.</p>
        </div>
      </footer>
    </div>
  )
}
