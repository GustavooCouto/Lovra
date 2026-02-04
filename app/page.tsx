"use client"

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
  User,
  Lock,
  Check,
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Centered Logo and Animated Hearts */}
      <header className="py-4 px-6 flex items-center justify-between relative">
        <div className="w-20" />
        
        {/* Centered Logo with Animated Hearts */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="relative">
            {/* Animated floating hearts */}
            <Heart 
              className="absolute -top-3 -left-4 w-4 h-4 text-primary/60 fill-primary/60 animate-bounce" 
              style={{ animationDelay: "0s", animationDuration: "2s" }} 
            />
            <Heart 
              className="absolute -top-2 -right-5 w-3 h-3 text-primary/40 fill-primary/40 animate-bounce" 
              style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} 
            />
            <Heart 
              className="absolute -bottom-2 -left-5 w-2.5 h-2.5 text-primary/50 fill-primary/50 animate-bounce" 
              style={{ animationDelay: "1s", animationDuration: "2.2s" }} 
            />
            <Heart 
              className="absolute -bottom-3 -right-4 w-3.5 h-3.5 text-primary/30 fill-primary/30 animate-bounce" 
              style={{ animationDelay: "0.3s", animationDuration: "1.8s" }} 
            />
            <Heart 
              className="absolute top-0 left-8 w-2 h-2 text-primary/20 fill-primary/20 animate-bounce" 
              style={{ animationDelay: "0.7s", animationDuration: "2.8s" }} 
            />
            
            {/* Main Logo */}
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <span className="text-2xl font-bold text-foreground">Lovra</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Seguro</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span>+2.847 cartas criadas hoje</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            Crie uma <span className="text-primary">carta de amor</span> em minutos
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Surpreenda quem voce ama com uma carta digital personalizada. Fotos, musica e um QR Code exclusivo.
          </p>

          {/* CTA */}
          <Link href="/criar">
            <Button size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              <Gift className="w-5 h-5 mr-2" />
              Criar Minha Carta
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>

          {/* Trust Text */}
          <p className="text-sm text-muted-foreground mt-4">
            Comece gratis - Pronto em 5 minutos
          </p>

          {/* Freemium Badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
            <Check className="w-4 h-4" />
            <span>Versao gratuita disponivel</span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Personalize</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Adicione fotos, mensagens e musica
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <QrCode className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Gere QR Code</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Link unico e seguro para compartilhar
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Emocione</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Escaneie e veja a magia acontecer
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                >
                  <User className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 ml-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="text-sm font-medium text-foreground ml-1">4.9</span>
            </div>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-foreground mb-2">&ldquo;{review.text}&rdquo;</p>
                <p className="text-xs text-muted-foreground">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link href="/criar">
            <Button size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              Comecar Agora - Gratis
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Pagamento seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Dados protegidos</span>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-4 md:py-6 text-center text-xs md:text-sm text-muted-foreground">
        <p>Lovra - Cartas de amor digitais</p>
      </footer>
    </div>
  )
}
