"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Heart,
  Diamond,
  Home,
  Sparkles,
  Smile,
  Users,
  User,
  Baby,
  ImagePlus,
  Music,
  ChevronRight,
  ChevronLeft,
  Lock,
  Star,
  Check,
  X,
  ArrowLeft,
  Wand2,
  Loader2,
  QrCode,
  Link2,
  Calendar,
  Edit3,
  Gift,
  Zap,
  Flower2,
  Mail,
  Plus,
  Crown,
  Copy,
  Download,
  ExternalLink,
} from "lucide-react"

const mainRelationshipTypes = [
  { id: "namorando", label: "Namorando", icon: Heart },
  { id: "noivos", label: "Noivos", icon: Diamond },
  { id: "casados", label: "Casados", icon: Home },
  { id: "ficante", label: "Ficante", icon: Sparkles },
]

const otherRelationshipTypes = [
  { id: "amigo", label: "Amigo(a)", icon: Smile },
  { id: "mae", label: "Mae", icon: Heart },
  { id: "pai", label: "Pai", icon: User },
  { id: "irmao", label: "Irmao/Irma", icon: Users },
  { id: "filho", label: "Filho(a)", icon: Baby },
  { id: "parente", label: "Parente", icon: Users },
]

const messageSuggestions = [
  { 
    title: "Declaracao romantica",
    text: "Meu amor, cada dia ao seu lado e uma nova pagina de uma historia que eu nunca quero que termine. Voce chegou na minha vida de uma forma tao especial que transformou completamente meu jeito de ver o mundo. Antes de te conhecer, eu nao sabia que era possivel sentir tanta paz e felicidade ao mesmo tempo. Voce e meu refugio, meu porto seguro, a pessoa que me entende sem eu precisar dizer uma palavra. Obrigado por ser quem voce e, por me amar do jeito que me ama, e por fazer cada momento valer a pena. Te amo mais do que palavras podem expressar."
  },
  {
    title: "Para quem esta longe",
    text: "A distancia pode nos separar fisicamente, mas meu coracao esta sempre conectado ao seu. Cada segundo longe de voce me faz perceber o quanto voce e importante na minha vida. Voce nao e apenas alguem que eu amo - voce e minha melhor amiga, minha confidente, minha parceira em todas as aventuras. Mesmo nos dias mais dificeis, so de pensar em voce, tudo fica mais leve. Nao vejo a hora de te abracar novamente, de sentir seu perfume, de olhar nos seus olhos e ver todo o amor que existe entre nos."
  },
  {
    title: "Gratidao pelo amor",
    text: "Voce e a razao do meu sorriso todas as manhas e a ultima lembranca feliz antes de dormir. Desde que nos conhecemos, minha vida ganhou cores que eu nem sabia que existiam. Voce me ensinou o verdadeiro significado do amor - um amor que e paciente, bondoso, que nao cobra, que apenas existe de forma pura e verdadeira. Obrigado por todos os momentos que vivemos juntos, pelos risos compartilhados, pelas lagrimas enxugadas, pelos sonhos construidos a dois. Voce e meu presente mais precioso."
  },
  {
    title: "Admiracao e amor",
    text: "Quando penso em tudo que vivemos juntos, meu coracao transborda de gratidao. Voce apareceu na minha vida no momento certo e desde entao nada mais foi igual. Voce me faz querer ser uma pessoa melhor a cada dia, me inspira com sua forca, sua determinacao e seu coracao generoso. Eu admiro tudo em voce - seu jeito de sorrir, de cuidar de quem ama, de enfrentar os desafios com coragem. Obrigado por escolher caminhar ao meu lado nessa jornada chamada vida."
  },
  {
    title: "Saudade intensa",
    text: "Cada momento sem voce parece durar uma eternidade. Fecho os olhos e consigo sentir seu abraco, seu cheiro, o calor da sua pele junto a minha. A saudade aperta o peito, mas tambem me lembra o quanto esse amor e real e forte. Voce e a pessoa que mais quero perto de mim, a unica que consegue acalmar minha alma com um simples olhar. Conte os dias ate nos encontrarmos novamente, porque cada segundo vale a pena quando e com voce."
  },
  {
    title: "Promessa de amor",
    text: "Prometo estar ao seu lado em todos os momentos - nos dias de sol e nos dias de chuva, nas alegrias e nas dificuldades. Prometo ser seu ombro amigo, seu porto seguro, a pessoa que vai te apoiar em todos os seus sonhos. Prometo te amar com a mesma intensidade de hoje, amanha e sempre. Voce e o amor da minha vida, e eu vou passar o resto dos meus dias provando isso pra voce. Obrigado por existir e por me deixar fazer parte da sua historia."
  },
]

const aiMessages = [
  "Meu amor, as palavras parecem pequenas demais para descrever o que sinto por voce. Voce e minha paz em meio ao caos, minha certeza quando tudo parece incerto. Cada momento ao seu lado e um presente que guardo no coracao. Te amo de uma forma que transcende qualquer explicacao - e um amor que simplesmente existe, forte e verdadeiro, como se tivesse sido escrito nas estrelas muito antes de nos conhecermos. Obrigado por ser voce, por me aceitar como sou, e por fazer da minha vida uma aventura que vale a pena ser vivida.",
  "Voce chegou na minha vida como um raio de sol em um dia nublado. Antes de te conhecer, eu nao sabia que era possivel amar assim - de forma tao intensa, tao pura, tao completa. Voce me faz acreditar em finais felizes, em amor verdadeiro, em destino. Cada sorriso seu e capaz de iluminar meu dia inteiro, cada abraco seu me faz sentir que estou exatamente onde devo estar. Prometo cuidar desse amor todos os dias, rega-lo com carinho e gratidao, e nunca deixar que a rotina apague essa chama que arde entre nos.",
  "Se eu pudesse escolher qualquer pessoa nesse mundo para passar a vida ao lado, escolheria voce, sempre voce, mil vezes voce. Voce e minha pessoa favorita, minha confidente, minha melhor amiga e meu grande amor. Com voce aprendi que amar e muito mais do que sentir borboletas no estomago - e escolher estar junto todos os dias, e se importar de verdade, e construir uma historia que vale a pena ser contada. Te amo hoje e vou te amar para sempre.",
]

const colorThemes = [
  { id: "red", color: "bg-red-500", name: "Vermelho" },
  { id: "pink", color: "bg-pink-500", name: "Rosa" },
  { id: "purple", color: "bg-purple-500", name: "Roxo" },
  { id: "blue", color: "bg-blue-400", name: "Azul" },
  { id: "gold", color: "bg-amber-500", name: "Dourado" },
]

const decorationOptions = [
  { id: "hearts", label: "Coracoes", icon: Heart },
  { id: "stars", label: "Estrelas", icon: Star },
  { id: "sparkles", label: "Brilhos", icon: Sparkles },
  { id: "flowers", label: "Flores", icon: Flower2 },
]

const qrCodeStyles = [
  { id: "simple", label: "Simples", description: "Classico" },
  { id: "hearts", label: "Coracoes", description: "Com moldura" },
  { id: "gradient", label: "Colorido", description: "Gradiente" },
]

const TOTAL_STEPS = 7
const FREE_PHOTO_LIMIT = 5
const EXTRA_PHOTOS_PRICE = 4.90
const DECORATION_PRICE = 1.00
const THEME_CHANGE_PRICE = 1.00
const DEFAULT_THEME = "red"

export default function CriarCartaPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRelationship, setSelectedRelationship] = useState("")
  const [showOtherRelationships, setShowOtherRelationships] = useState(false)
  const [partnerName, setPartnerName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME)
  const [hasChangedTheme, setHasChangedTheme] = useState(false)
  const [photos, setPhotos] = useState<{ url: string; file?: File }[]>([])
  const [musicUrl, setMusicUrl] = useState("")
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([])
  const [selectedQrStyle, setSelectedQrStyle] = useState("simple")
  const [shareMethod, setShareMethod] = useState<"qr" | "link">("link")
  const [selectedPlan, setSelectedPlan] = useState<"unico" | "mensal">("unico")
  const [countdownEnabled, setCountdownEnabled] = useState(false)
  const [togetherDate, setTogetherDate] = useState("")
  const [offerTimeLeft, setOfferTimeLeft] = useState(300) // 5 minutos
  const [showTransition, setShowTransition] = useState(false)
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false)
  const [timelineMode, setTimelineMode] = useState(false)
  const [wantsExtraPhotos, setWantsExtraPhotos] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [pixCode, setPixCode] = useState("")
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [cartaId, setCartaId] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "approved" | "rejected">("pending")
  const [showPixPayment, setShowPixPayment] = useState(false)
  const [copiedPix, setCopiedPix] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const extraPhotosCount = Math.max(0, photos.length - FREE_PHOTO_LIMIT)
  const extraPhotosCost = extraPhotosCount > 0 ? EXTRA_PHOTOS_PRICE : 0
  const decorationsCost = selectedDecorations.length * DECORATION_PRICE
  const themeCost = hasChangedTheme && selectedTheme !== DEFAULT_THEME ? THEME_CHANGE_PRICE : 0
  const totalExtrasCost = extraPhotosCost + decorationsCost + themeCost

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const daysTogether = useMemo(() => {
    if (!togetherDate) return 0
    const start = new Date(togetherDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [togetherDate])

  const showCountdownOption = ["namorando", "noivos", "casados"].includes(selectedRelationship)

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedRelationship !== "" && partnerName.trim() !== ""
      case 2:
        return message.trim().length >= 10
      case 3:
        return true
      case 4:
        return true
      case 5:
        return true
      case 6:
        return true
      case 7:
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      if (currentStep === 6) {
        setShowTransition(true)
        setTimeout(() => {
          setShowTransition(false)
          setCurrentStep(7)
        }, 4000)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const getPaymentAmount = useCallback(() => {
    const basePlan = selectedPlan === "unico" ? 17.89 : 39.89
    return basePlan + extraPhotosCost
  }, [selectedPlan, extraPhotosCost])

  const handleCreatePayment = async () => {
    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Por favor, insira um email valido')
      return
    }

    setIsProcessingPayment(true)
    
    // Gerar ID unico para a carta
    const uniqueId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
    setCartaId(uniqueId)
    
    // Salvar dados da carta
    const cartaData = {
      id: uniqueId,
      partnerName,
      senderName,
      message,
      selectedTheme,
      selectedDecorations,
      photos: photos.map(p => p.url),
      timelineMode,
      musicUrl,
      countdownEnabled,
      togetherDate,
      selectedRelationship,
      email: customerEmail,
      isPaid: false,
      createdAt: new Date().toISOString()
    }
    
    // Save to localStorage as backup
    localStorage.setItem(`carta_${uniqueId}`, JSON.stringify(cartaData))
    
    // Save to API
    try {
      await fetch('/api/cartas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartaData)
      })
    } catch (error) {
      console.error('Error saving carta:', error)
    }
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    setGeneratedLink(`${baseUrl}/carta/${uniqueId}`)
    
    try {
      // Create Mercado Pago PIX payment
      const response = await fetch('/api/mercadopago/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getPaymentAmount(),
          description: `Carta de Amor Digital - Lovra - ${selectedPlan === "unico" ? "Plano Unico" : "Plano Mensal"}`,
          email: customerEmail,
          cartaId: uniqueId,
        })
      })
      
      const payment = await response.json()
      
      if (payment.qr_code) {
        setPixCode(payment.qr_code)
        setPixQrCodeBase64(payment.qr_code_base64)
        setPaymentId(payment.id)
        setShowPixPayment(true)
        setIsProcessingPayment(false)
        
        // Start polling for payment status
        startPaymentStatusPolling(payment.id, uniqueId)
      } else {
        // Fallback for demo/testing without real Mercado Pago credentials
        console.log('Mercado Pago not configured, using demo mode')
        setShowPixPayment(true)
        setPixCode(`00020126580014br.gov.bcb.pix0136${uniqueId}5204000053039865406${getPaymentAmount().toFixed(2)}5802BR5913Lovra Digital6008BRASILIA62070503***6304`)
        setIsProcessingPayment(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      // Demo fallback
      setShowPixPayment(true)
      setPixCode(`00020126580014br.gov.bcb.pix0136${uniqueId}5204000053039865406${getPaymentAmount().toFixed(2)}5802BR5913Lovra Digital6008BRASILIA62070503***6304`)
      setIsProcessingPayment(false)
    }
  }

  const startPaymentStatusPolling = (paymentId: string, cartaIdParam: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/mercadopago/webhook?payment_id=${paymentId}`)
        const data = await response.json()
        
        if (data.status === 'approved') {
          clearInterval(pollInterval)
          setPaymentStatus('approved')
          setIsPaid(true)
          
          // Update carta payment status
          const cartaData = localStorage.getItem(`carta_${cartaIdParam}`)
          if (cartaData) {
            const parsed = JSON.parse(cartaData)
            parsed.isPaid = true
            parsed.paymentId = paymentId
            localStorage.setItem(`carta_${cartaIdParam}`, JSON.stringify(parsed))
          }
          
          // Update via API
          await fetch('/api/cartas', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: cartaIdParam, isPaid: true, paymentId })
          })
        } else if (data.status === 'rejected') {
          clearInterval(pollInterval)
          setPaymentStatus('rejected')
        }
      } catch (error) {
        console.error('Error polling payment status:', error)
      }
    }, 3000) // Poll every 3 seconds
    
    // Stop polling after 10 minutes
    setTimeout(() => clearInterval(pollInterval), 600000)
  }

  const handleDemoPayment = () => {
    // For demo/testing purposes - simulate payment approval
    setPaymentStatus('approved')
    setIsPaid(true)
    
    const cartaData = localStorage.getItem(`carta_${cartaId}`)
    if (cartaData) {
      const parsed = JSON.parse(cartaData)
      parsed.isPaid = true
      localStorage.setItem(`carta_${cartaId}`, JSON.stringify(parsed))
    }
  }

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    setCopiedPix(true)
    setTimeout(() => setCopiedPix(false), 2000)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink)
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Para quem e essa carta?"
      case 2:
        return "Escreva sua mensagem"
      case 3:
        return "Adicione fotos especiais"
      case 4:
        return "Personalize sua carta"
      case 5:
        return "Toques finais"
      case 6:
        return "Como quer compartilhar?"
      case 7:
        return isPaid ? "Sua carta esta pronta!" : "Finalize sua carta!"
      default:
        return ""
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const maxPhotos = wantsExtraPhotos ? 10 : FREE_PHOTO_LIMIT
    const remainingSlots = maxPhotos - photos.length
    
    if (remainingSlots <= 0) return
    
    const filesToProcess = Array.from(files).slice(0, remainingSlots)
    
    filesToProcess.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        setPhotos(prev => [...prev, { url, file }])
      }
      reader.readAsDataURL(file)
    })
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const handleThemeChange = (themeId: string) => {
    if (themeId !== DEFAULT_THEME) {
      setHasChangedTheme(true)
    }
    setSelectedTheme(themeId)
  }

  const removeDecoration = (decorationId: string) => {
    setSelectedDecorations(selectedDecorations.filter(d => d !== decorationId))
  }

  const generateAIMessage = () => {
    setIsGeneratingAI(true)
    setTimeout(() => {
      const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)]
      setMessage(randomMessage)
      setIsGeneratingAI(false)
    }, 2000)
  }

  const toggleDecoration = (id: string) => {
    setSelectedDecorations((prev) => 
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  const themeColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    red: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-400/40", gradient: "from-red-500/30 via-rose-500/20 to-red-500/30" },
    pink: { bg: "bg-pink-500/20", text: "text-pink-400", border: "border-pink-400/40", gradient: "from-pink-500/30 via-rose-400/20 to-pink-500/30" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-400/40", gradient: "from-purple-500/30 via-fuchsia-500/20 to-purple-500/30" },
    blue: { bg: "bg-blue-400/20", text: "text-blue-400", border: "border-blue-400/40", gradient: "from-blue-500/30 via-cyan-500/20 to-blue-500/30" },
    gold: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-400/40", gradient: "from-amber-500/30 via-yellow-500/20 to-amber-500/30" },
  }

  const currentTheme = themeColors[selectedTheme] || themeColors.red

  // Transition Animation Screen - Envelope Animation
  if (showTransition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
        {/* Floating decorations all around */}
        <div className="absolute inset-0 pointer-events-none">
          {selectedDecorations.includes("hearts") && (
            <>
              <Heart className={`absolute top-[10%] left-[10%] w-6 h-6 ${currentTheme.text} fill-current animate-float-slow opacity-60`} />
              <Heart className={`absolute top-[20%] right-[15%] w-4 h-4 ${currentTheme.text} fill-current animate-float-medium opacity-40`} />
              <Heart className={`absolute top-[40%] left-[5%] w-5 h-5 ${currentTheme.text} fill-current animate-float-fast opacity-50`} />
              <Heart className={`absolute bottom-[30%] right-[8%] w-7 h-7 ${currentTheme.text} fill-current animate-float-slow opacity-70`} />
              <Heart className={`absolute bottom-[15%] left-[20%] w-3 h-3 ${currentTheme.text} fill-current animate-float-medium opacity-30`} />
              <Heart className={`absolute top-[60%] right-[25%] w-4 h-4 ${currentTheme.text} fill-current animate-float-fast opacity-45`} />
            </>
          )}
          {selectedDecorations.includes("stars") && (
            <>
              <Star className={`absolute top-[15%] right-[20%] w-5 h-5 ${currentTheme.text} fill-current animate-twinkle opacity-60`} />
              <Star className={`absolute top-[35%] left-[15%] w-4 h-4 ${currentTheme.text} fill-current animate-twinkle-delayed opacity-50`} />
              <Star className={`absolute bottom-[25%] right-[12%] w-6 h-6 ${currentTheme.text} fill-current animate-twinkle opacity-70`} />
              <Star className={`absolute bottom-[40%] left-[8%] w-3 h-3 ${currentTheme.text} fill-current animate-twinkle-delayed opacity-40`} />
            </>
          )}
          {selectedDecorations.includes("sparkles") && (
            <>
              <Sparkles className={`absolute top-[25%] left-[25%] w-5 h-5 ${currentTheme.text} animate-sparkle opacity-60`} />
              <Sparkles className={`absolute top-[50%] right-[10%] w-4 h-4 ${currentTheme.text} animate-sparkle-delayed opacity-50`} />
              <Sparkles className={`absolute bottom-[20%] left-[12%] w-6 h-6 ${currentTheme.text} animate-sparkle opacity-70`} />
              <Sparkles className={`absolute bottom-[35%] right-[22%] w-3 h-3 ${currentTheme.text} animate-sparkle-delayed opacity-40`} />
            </>
          )}
          {selectedDecorations.includes("flowers") && (
            <>
              <Flower2 className={`absolute top-[18%] left-[18%] w-5 h-5 ${currentTheme.text} animate-sway opacity-60`} />
              <Flower2 className={`absolute top-[45%] right-[18%] w-4 h-4 ${currentTheme.text} animate-sway-delayed opacity-50`} />
              <Flower2 className={`absolute bottom-[28%] left-[22%] w-6 h-6 ${currentTheme.text} animate-sway opacity-70`} />
            </>
          )}
        </div>

        <div className="text-center animate-in fade-in zoom-in duration-700 relative z-10">
          {/* Envelope Animation */}
          <div className="relative mb-8 mx-auto w-48 h-36 perspective-1000">
            {/* Envelope body */}
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${currentTheme.gradient} border-2 ${currentTheme.border} shadow-2xl`}>
              {/* Envelope flap - animates closing */}
              <div 
                className={`absolute -top-1 left-0 right-0 h-20 origin-top bg-gradient-to-b ${currentTheme.gradient} border-2 ${currentTheme.border} rounded-t-lg animate-envelope-close`}
                style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
              />
              
              {/* Letter inside */}
              <div className="absolute inset-4 top-8 bg-white/90 rounded shadow-inner flex items-center justify-center animate-letter-slide">
                <div className="text-center p-2">
                  <Heart className={`w-6 h-6 mx-auto mb-1 ${currentTheme.text.replace('text-', 'text-')} fill-current`} />
                  <p className="text-[8px] text-gray-600 font-medium">Para {partnerName}</p>
                </div>
              </div>
            </div>
            
            {/* Floating hearts around envelope */}
            <Heart className={`absolute -top-6 -left-6 w-5 h-5 ${currentTheme.text} fill-current animate-heart-float-1`} />
            <Heart className={`absolute -top-4 -right-8 w-4 h-4 ${currentTheme.text} fill-current animate-heart-float-2`} />
            <Heart className={`absolute -bottom-4 -left-8 w-6 h-6 ${currentTheme.text} fill-current animate-heart-float-3`} />
            <Heart className={`absolute -bottom-6 -right-6 w-3 h-3 ${currentTheme.text} fill-current animate-heart-float-4`} />
            <Heart className={`absolute top-1/2 -left-10 w-4 h-4 ${currentTheme.text} fill-current animate-heart-float-5`} />
            <Heart className={`absolute top-1/2 -right-10 w-5 h-5 ${currentTheme.text} fill-current animate-heart-float-6`} />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-pulse">Sua carta esta quase pronta!</h2>
          <p className={`${currentTheme.text} text-lg mb-4`}>Para: {partnerName}</p>
          
          <div className={`max-w-sm mx-auto p-4 rounded-xl ${currentTheme.bg} border ${currentTheme.border} mb-6 animate-in slide-in-from-bottom-4 duration-1000`}>
            <p className="text-white/80 text-sm italic line-clamp-3">&ldquo;{message.substring(0, 100)}...&rdquo;</p>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-white/60">
            <Mail className={`w-5 h-5 ${currentTheme.text} animate-bounce`} />
            <span className="text-sm animate-pulse">Selando sua carta com amor...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/2 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-3 px-4 md:px-6 flex items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Cancelar</span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <span className="text-lg font-bold text-foreground">Lovra</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Seguro</span>
        </div>
      </header>

      {/* Progress Section */}
      <div className="relative z-10 px-4 md:px-6 pt-4 max-w-6xl mx-auto">
        {/* Step title + percentage */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">
              {currentStep === TOTAL_STEPS ? "Ultimo passo!" : `Vamos comecar!`}
            </span>
          </div>
          <span className="text-sm font-bold text-primary">
            {Math.round((currentStep / TOTAL_STEPS) * 100)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-between px-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <button
              key={i}
              onClick={() => i + 1 <= currentStep && goToStep(i + 1)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i + 1 === currentStep
                  ? "bg-primary scale-125 shadow-sm shadow-primary/50"
                  : i + 1 < currentStep
                  ? "bg-primary/50"
                  : "bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-4 md:py-6">
        {/* Step Indicator */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-foreground text-balance font-serif">
            {getStepTitle()}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {currentStep === 1 && "Como voce quer surpreender no Valentine's Day?"}
            {currentStep === 2 && "Expresse seus sentimentos com palavras"}
            {currentStep === 3 && "Adicione momentos especiais"}
            {currentStep === 4 && "Deixe com a sua cara"}
            {currentStep === 5 && "Detalhes que fazem a diferenca"}
            {currentStep === 6 && "Escolha como enviar sua carta"}
            {currentStep === 7 && (isPaid ? "Compartilhe com quem voce ama" : "Complete seu pedido")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Form Section */}
          <div className="flex-1 max-w-xl mx-auto lg:mx-0 w-full">
            {/* Step 1: Relationship & Name */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <Label className="text-foreground text-sm font-medium mb-2 block">
                    Tipo de relacionamento
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {mainRelationshipTypes.map((type) => {
                      const IconComponent = type.icon
                      const isSelected = selectedRelationship === type.id
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedRelationship(type.id)}
                          className={`relative p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
                              : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:bg-card/80"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? "bg-primary/20" : "bg-secondary/60"
                          }`}>
                            <IconComponent className={`w-5 h-5 ${isSelected ? "text-primary fill-primary" : ""}`} />
                          </div>
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Other relationships toggle */}
                  <button
                    onClick={() => setShowOtherRelationships(!showOtherRelationships)}
                    className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {showOtherRelationships ? "Mostrar menos" : "Outros relacionamentos"}
                    <ChevronRight className={`w-3 h-3 transition-transform ${showOtherRelationships ? "rotate-90" : ""}`} />
                  </button>

                  {showOtherRelationships && (
                    <div className="grid grid-cols-3 gap-2 mt-2 animate-in fade-in duration-200">
                      {otherRelationshipTypes.map((type) => {
                        const isSelected = selectedRelationship === type.id
                        return (
                          <button
                            key={type.id}
                            onClick={() => setSelectedRelationship(type.id)}
                            className={`p-2 rounded-lg border transition-all text-center ${
                              isSelected
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <span className="text-xs font-medium">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="partner-name" className="text-foreground text-sm font-medium mb-2 block">
                      Para quem?
                    </Label>
                    <Input
                      id="partner-name"
                      placeholder="Ex: Maria"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      className="bg-card border-border text-foreground h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sender-name" className="text-foreground text-sm font-medium mb-2 block">
                      De quem?
                    </Label>
                    <Input
                      id="sender-name"
                      placeholder="Ex: Joao"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="bg-card border-border text-foreground h-10"
                    />
                  </div>
                </div>

                {/* Countdown option for romantic relationships */}
                {showCountdownOption && (
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Contador de tempo juntos</span>
                      </div>
                      <button
                        onClick={() => setCountdownEnabled(!countdownEnabled)}
                        className={`w-10 h-5 rounded-full transition-colors ${countdownEnabled ? "bg-primary" : "bg-muted-foreground/30"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-card transition-transform mx-0.5 ${countdownEnabled ? "translate-x-5" : ""}`} />
                      </button>
                    </div>
                    {countdownEnabled && (
                      <div className="animate-in fade-in duration-200">
                        <Label className="text-xs text-muted-foreground mb-1 block">Desde quando estao juntos?</Label>
                        <Input
                          type="date"
                          value={togetherDate}
                          onChange={(e) => setTogetherDate(e.target.value)}
                          className="bg-card border-border text-foreground h-9 text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Opcional - mostra quantos dias juntos</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Message */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-foreground text-sm font-medium">Sua mensagem</Label>
                  </div>
                  <Textarea
                    placeholder="Escreva aqui sua mensagem de coracao..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-card border-border text-foreground min-h-[140px] md:min-h-[180px] text-sm resize-none"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
                    <p className="text-xs text-muted-foreground">
                      Minimo 10 caracteres ({message.length}/10)
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSuggestionsModal(true)}
                        className="bg-transparent border-border text-muted-foreground hover:bg-secondary hover:text-foreground gap-1 h-8 text-xs"
                      >
                        <Heart className="w-3 h-3" />
                        Sugestoes
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateAIMessage}
                        disabled={isGeneratingAI}
                        className="bg-transparent text-primary border-primary/30 hover:bg-primary/5 hover:border-primary gap-1 h-8 text-xs"
                      >
                        {isGeneratingAI ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Gerando...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-3 h-3" />
                            Gerar com IA
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Sugestoes rapidas:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {messageSuggestions.slice(0, 4).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(suggestion.text)}
                        className="w-full p-2 text-xs bg-secondary rounded-lg text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors text-left"
                      >
                        <span className="font-medium block mb-0.5">{suggestion.title}</span>
                        <span className="text-muted-foreground line-clamp-1">{suggestion.text.substring(0, 50)}...</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Photo limit info */}
                <div className={`rounded-lg p-3 ${photos.length >= FREE_PHOTO_LIMIT && !wantsExtraPhotos ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-secondary/50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImagePlus className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {photos.length}/{wantsExtraPhotos ? 10 : FREE_PHOTO_LIMIT} fotos
                      </span>
                    </div>
                    {photos.length >= FREE_PHOTO_LIMIT && !wantsExtraPhotos && (
                      <span className="text-xs text-amber-600 font-medium">Limite gratuito atingido</span>
                    )}
                  </div>
                  
                  {photos.length >= FREE_PHOTO_LIMIT && !wantsExtraPhotos && (
                    <button
                      onClick={() => setWantsExtraPhotos(true)}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-3 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary text-sm font-medium transition-colors"
                    >
                      <Crown className="w-4 h-4" />
                      Desbloquear +5 fotos por R$ {EXTRA_PHOTOS_PRICE.toFixed(2).replace('.', ',')}
                    </button>
                  )}
                  
                  {wantsExtraPhotos && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-primary">
                      <Check className="w-3 h-3" />
                      <span>+5 fotos extras desbloqueadas (+R$ {EXTRA_PHOTOS_PRICE.toFixed(2).replace('.', ',')})</span>
                    </div>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                
                {/* Upload area */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors cursor-pointer ${
                    (photos.length >= FREE_PHOTO_LIMIT && !wantsExtraPhotos) || (wantsExtraPhotos && photos.length >= 10)
                      ? 'border-muted opacity-50 cursor-not-allowed'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => {
                    if ((photos.length < FREE_PHOTO_LIMIT) || (wantsExtraPhotos && photos.length < 10)) {
                      fileInputRef.current?.click()
                    }
                  }}
                >
                  <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-foreground font-medium mb-1 text-sm">
                    Toque para adicionar fotos da galeria
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG ate 10MB (opcional)
                  </p>
                </div>

                {/* Photos grid or timeline */}
                {photos.length > 0 && (
                  <div className="space-y-3">
                    {/* Timeline toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Modo Timeline</span>
                      <button
                        onClick={() => setTimelineMode(!timelineMode)}
                        className={`w-10 h-5 rounded-full transition-colors ${timelineMode ? "bg-primary" : "bg-muted-foreground/30"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-card transition-transform mx-0.5 ${timelineMode ? "translate-x-5" : ""}`} />
                      </button>
                    </div>
                    
                    {timelineMode ? (
                      // Timeline view
                      <div className="relative pl-6">
                        <div className={`absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b ${currentTheme.gradient}`} />
                        {photos.map((photo, index) => (
                          <div key={index} className="relative mb-4 last:mb-0">
                            <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
                              selectedTheme === 'red' ? 'bg-red-500' :
                              selectedTheme === 'pink' ? 'bg-pink-500' :
                              selectedTheme === 'purple' ? 'bg-purple-500' :
                              selectedTheme === 'blue' ? 'bg-blue-400' :
                              'bg-amber-500'
                            } border-2 border-background`} />
                            <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-2">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 relative">
                                <Image
                                  src={photo.url}
                                  alt={`Foto ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">Momento {index + 1}</p>
                                <p className="text-xs text-muted-foreground">
                                  {index >= FREE_PHOTO_LIMIT ? '(Foto extra)' : 'Gratis'}
                                </p>
                              </div>
                              <button
                                onClick={() => removePhoto(index)}
                                className="w-7 h-7 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-full flex items-center justify-center transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Grid view
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {photos.map((photo, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden relative group">
                            <Image
                              src={photo.url}
                              alt={`Foto ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            {index >= FREE_PHOTO_LIMIT && (
                              <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary/90 rounded text-[8px] text-primary-foreground font-medium">
                                Extra
                              </div>
                            )}
                            <button
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Add more button */}
                        {((photos.length < FREE_PHOTO_LIMIT) || (wantsExtraPhotos && photos.length < 10)) && (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-6 h-6 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  Voce pode pular esta etapa se preferir
                </p>
              </div>
            )}

            {/* Step 4: Customization */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <Label className="text-foreground text-sm font-medium mb-2 block">
                    Cor do tema
                  </Label>
                  <div className="flex gap-2">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`w-9 h-9 rounded-full ${theme.color} transition-all duration-200 ${
                          selectedTheme === theme.id
                            ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
                            : "hover:scale-105"
                        }`}
                        title={theme.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-foreground text-sm font-medium mb-2 block">
                    Enfeites animados
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {decorationOptions.map((decoration) => {
                      const IconComponent = decoration.icon
                      const isSelected = selectedDecorations.includes(decoration.id)
                      return (
                        <button
                          key={decoration.id}
                          onClick={() => toggleDecoration(decoration.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs ${
                            isSelected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <IconComponent className={`w-3 h-3 ${isSelected ? 'animate-bounce' : ''}`} />
                          {decoration.label}
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Decorations preview */}
                  {selectedDecorations.length > 0 && (
                    <div className={`relative h-24 rounded-xl ${currentTheme.bg} border ${currentTheme.border} overflow-hidden`}>
                      <p className="absolute top-2 left-3 text-xs text-white/60">Preview dos enfeites:</p>
                      
                      {selectedDecorations.includes("hearts") && (
                        <>
                          <Heart className={`absolute top-4 left-[15%] w-4 h-4 ${currentTheme.text} fill-current animate-float-slow`} />
                          <Heart className={`absolute top-8 left-[35%] w-3 h-3 ${currentTheme.text} fill-current animate-float-medium`} />
                          <Heart className={`absolute bottom-4 left-[25%] w-5 h-5 ${currentTheme.text} fill-current animate-float-fast`} />
                          <Heart className={`absolute top-6 right-[20%] w-3.5 h-3.5 ${currentTheme.text} fill-current animate-float-slow`} style={{ animationDelay: '0.5s' }} />
                          <Heart className={`absolute bottom-6 right-[30%] w-4 h-4 ${currentTheme.text} fill-current animate-float-medium`} style={{ animationDelay: '0.3s' }} />
                        </>
                      )}
                      
                      {selectedDecorations.includes("stars") && (
                        <>
                          <Star className={`absolute top-5 left-[45%] w-4 h-4 ${currentTheme.text} fill-current animate-twinkle`} />
                          <Star className={`absolute bottom-5 left-[55%] w-3 h-3 ${currentTheme.text} fill-current animate-twinkle-delayed`} />
                          <Star className={`absolute top-8 right-[15%] w-3.5 h-3.5 ${currentTheme.text} fill-current animate-twinkle`} style={{ animationDelay: '0.7s' }} />
                        </>
                      )}
                      
                      {selectedDecorations.includes("sparkles") && (
                        <>
                          <Sparkles className={`absolute top-6 left-[60%] w-4 h-4 ${currentTheme.text} animate-sparkle`} />
                          <Sparkles className={`absolute bottom-4 left-[70%] w-3 h-3 ${currentTheme.text} animate-sparkle-delayed`} />
                          <Sparkles className={`absolute top-10 right-[25%] w-3.5 h-3.5 ${currentTheme.text} animate-sparkle`} style={{ animationDelay: '0.4s' }} />
                        </>
                      )}
                      
                      {selectedDecorations.includes("flowers") && (
                        <>
                          <Flower2 className={`absolute top-5 left-[75%] w-4 h-4 ${currentTheme.text} animate-sway`} />
                          <Flower2 className={`absolute bottom-6 left-[10%] w-5 h-5 ${currentTheme.text} animate-sway-delayed`} />
                          <Flower2 className={`absolute top-10 left-[50%] w-3 h-3 ${currentTheme.text} animate-sway`} style={{ animationDelay: '0.6s' }} />
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-foreground text-sm font-medium mb-2 block">
                    Musica de fundo (opcional)
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Link do Spotify ou YouTube"
                        value={musicUrl}
                        onChange={(e) => setMusicUrl(e.target.value)}
                        className="pl-9 bg-card border-border text-foreground h-10 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Final Touches */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <p className="text-sm text-muted-foreground text-center">Revise sua carta antes de continuar</p>
                
                {/* Summary of choices */}
                <div className={`rounded-xl p-4 ${currentTheme.bg} border ${currentTheme.border}`}>
                  <p className="text-sm font-medium text-white mb-3">Resumo da sua carta</p>
                  <div className="space-y-2 text-xs text-white/80">
                    <div className="flex justify-between">
                      <span>Para:</span>
                      <span className="font-medium text-white">{partnerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>De:</span>
                      <span className="font-medium text-white">{senderName || "Anonimo"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tema:</span>
                      <span className="font-medium text-white capitalize">{selectedTheme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fotos:</span>
                      <span className="font-medium text-white">{photos.length} foto{photos.length !== 1 ? 's' : ''} {timelineMode && photos.length > 0 ? '(Timeline)' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enfeites:</span>
                      <span className="font-medium text-white">{selectedDecorations.length} selecionado{selectedDecorations.length !== 1 ? 's' : ''}</span>
                    </div>
                    {countdownEnabled && togetherDate && (
                      <div className="flex justify-between">
                        <span>Contador:</span>
                        <span className="font-medium text-white">Ativado ({daysTogether} dias)</span>
                      </div>
                    )}
                    {musicUrl && (
                      <div className="flex justify-between">
                        <span>Musica:</span>
                        <span className="font-medium text-white">Adicionada</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message preview */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground mb-2">Sua mensagem:</p>
                  <p className="text-sm text-foreground italic line-clamp-4">&ldquo;{message}&rdquo;</p>
                </div>

                {/* Edit Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => goToStep(1)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Editar destinatario
                  </button>
                  <button
                    onClick={() => goToStep(2)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Editar mensagem
                  </button>
                  <button
                    onClick={() => goToStep(3)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Editar fotos
                  </button>
                  <button
                    onClick={() => goToStep(4)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Editar tema
                  </button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Tudo certo? Avance para escolher como compartilhar!
                </p>
              </div>
            )}

            {/* Step 6: Sharing Options */}
            {currentStep === 6 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Sharing Options */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Como quer compartilhar sua carta?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setShareMethod("link")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        shareMethod === "link"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${shareMethod === "link" ? currentTheme.bg : "bg-secondary"}`}>
                        <Link2 className={`w-6 h-6 ${shareMethod === "link" ? currentTheme.text : "text-muted-foreground"}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground">Link Compartilhavel</span>
                      <span className="text-xs text-muted-foreground text-center">Envie por WhatsApp, Instagram...</span>
                    </button>
                    <button
                      onClick={() => setShareMethod("qr")}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        shareMethod === "qr"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${shareMethod === "qr" ? currentTheme.bg : "bg-secondary"}`}>
                        <QrCode className={`w-6 h-6 ${shareMethod === "qr" ? currentTheme.text : "text-muted-foreground"}`} />
                      </div>
                      <span className="text-sm font-medium text-foreground">QR Code</span>
                      <span className="text-xs text-muted-foreground text-center">Imprima ou mostre na tela</span>
                    </button>
                  </div>

                  {shareMethod === "qr" && (
                    <div className="mt-4 animate-in fade-in duration-200">
                      <p className="text-xs text-muted-foreground mb-2">Escolha o estilo do QR Code:</p>
                      <div className="flex gap-2">
                        {qrCodeStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedQrStyle(style.id)}
                            className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                              selectedQrStyle === style.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <span className="text-xs font-medium">{style.label}</span>
                            <span className="text-[10px] text-muted-foreground block">{style.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => goToStep(5)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Voltar para revisar
                </button>
              </div>
            )}

            {/* Step 7: Payment */}
            {currentStep === 7 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                {!isPaid ? (
                  !showPixPayment ? (
                    <>
                      {/* Offer Timer */}
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-3 flex items-center justify-between animate-pulse">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5" />
                          <span className="text-sm font-bold">OFERTA EXPIRA EM</span>
                        </div>
                        <span className="text-lg font-black">{formatTime(offerTimeLeft)}</span>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <Label className="text-foreground text-sm font-medium">
                          Seu email (para receber o link/QR Code)
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="pl-10 bg-card border-border text-foreground h-11"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Enviaremos o link da sua carta para este email
                        </p>
                      </div>

                      {/* Plan Selection */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground text-center">Escolha seu plano</p>
                        
                        <button
                          onClick={() => setSelectedPlan("unico")}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                            selectedPlan === "unico"
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded animate-bounce">
                            Mais Popular
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground">Plano Unico</p>
                              <p className="text-xs text-muted-foreground">Pagamento unico - Acesso permanente</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-primary">R$ 17,89</p>
                              <p className="text-xs text-muted-foreground line-through">R$ 34,90</p>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => setSelectedPlan("mensal")}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                            selectedPlan === "mensal"
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                        >
                          <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
                            Premium
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-foreground">Plano Mensal</p>
                              <p className="text-xs text-muted-foreground">Acesso completo + recursos premium</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-foreground">R$ 39,89</p>
                              <p className="text-xs text-muted-foreground">/mes</p>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Extra photos cost */}
                      {extraPhotosCost > 0 && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Crown className="w-4 h-4 text-amber-400" />
                              <span className="text-sm text-amber-300">Fotos extras ({extraPhotosCount})</span>
                            </div>
                            <span className="text-sm font-bold text-amber-300">+ R$ {extraPhotosCost.toFixed(2).replace('.', ',')}</span>
                          </div>
                        </div>
                      )}

                      {/* Total */}
                      <div className={`rounded-xl p-4 ${currentTheme.bg} border ${currentTheme.border}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/80">Plano {selectedPlan === "unico" ? "Unico" : "Mensal"}</span>
                          <span className="text-white font-medium">R$ {selectedPlan === "unico" ? "17,89" : "39,89"}</span>
                        </div>
                        {extraPhotosCost > 0 && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80">Fotos extras</span>
                            <span className="text-white font-medium">R$ {extraPhotosCost.toFixed(2).replace('.', ',')}</span>
                          </div>
                        )}
                        <div className="border-t border-white/20 pt-2 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-bold">Total</span>
                            <span className="text-white font-bold text-lg">
                              R$ {getPaymentAmount().toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Social Proof */}
                      <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card" />
                          ))}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">+2.847 cartas enviadas hoje</p>
                        </div>
                      </div>

                      {/* Security Badges */}
                      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Pagamento seguro
                        </span>
                        <span className="flex items-center gap-1">
                          <Check className="w-3 h-3" /> Satisfacao garantida
                        </span>
                      </div>
                    </>
                  ) : (
                    /* PIX Payment Screen */
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`w-14 h-14 rounded-full ${currentTheme.bg} mx-auto mb-3 flex items-center justify-center`}>
                          <QrCode className={`w-7 h-7 ${currentTheme.text}`} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Pague com PIX</h3>
                        <p className="text-sm text-muted-foreground">
                          Escaneie o QR Code ou copie o codigo
                        </p>
                      </div>

                      {/* QR Code */}
                      <div className={`rounded-xl border ${currentTheme.border} ${currentTheme.bg} p-4`}>
                        {pixQrCodeBase64 ? (
                          <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center p-2">
                            <Image 
                              src={`data:image/png;base64,${pixQrCodeBase64}`}
                              alt="QR Code PIX"
                              width={180}
                              height={180}
                            />
                          </div>
                        ) : (
                          <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center">
                            <div className="text-center p-4">
                              <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                              <p className="text-xs text-gray-500">QR Code PIX</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 text-center">
                          <p className="text-2xl font-bold text-white">
                            R$ {getPaymentAmount().toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>

                      {/* PIX Copy-Paste */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Codigo PIX Copia e Cola:</Label>
                        <div className="flex gap-2">
                          <Input
                            value={pixCode}
                            readOnly
                            className="bg-secondary/50 text-xs font-mono"
                          />
                          <Button 
                            onClick={copyPixCode} 
                            size="icon" 
                            variant="outline"
                            className={copiedPix ? "bg-green-500 text-white border-green-500" : ""}
                          >
                            {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        onClick={copyPixCode}
                        className="w-full h-12 bg-primary text-primary-foreground"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copiedPix ? "Codigo copiado!" : "Copiar codigo PIX"}
                      </Button>

                      {/* Payment Status */}
                      <div className="bg-secondary/50 rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Aguardando confirmacao do pagamento...
                          </span>
                        </div>
                      </div>

                      {/* Demo Button (for testing) */}
                      <button
                        onClick={handleDemoPayment}
                        className="w-full text-xs text-muted-foreground hover:text-primary transition-colors underline"
                      >
                        Simular pagamento aprovado (demo)
                      </button>

                      <button
                        onClick={() => setShowPixPayment(false)}
                        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Voltar para escolher outro plano
                      </button>
                    </div>
                  )
                ) : (
                  /* After Payment - Show Link/QR */
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full ${currentTheme.bg} mx-auto mb-4 flex items-center justify-center`}>
                        <Check className={`w-8 h-8 ${currentTheme.text}`} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Pagamento confirmado!</h3>
                      <p className="text-sm text-muted-foreground">Sua carta esta pronta para ser enviada</p>
                      {customerEmail && (
                        <p className="text-xs text-primary mt-1">
                          Link enviado para: {customerEmail}
                        </p>
                      )}
                    </div>

                    {shareMethod === "link" ? (
                      <div className="space-y-3">
                        <div className="rounded-xl border border-border bg-card p-4">
                          <p className="text-xs text-muted-foreground mb-2">Seu link exclusivo:</p>
                          <div className="flex items-center gap-2">
                            <Input
                              value={generatedLink}
                              readOnly
                              className="bg-secondary/50 text-sm"
                            />
                            <Button onClick={copyLink} size="icon" variant="outline">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            onClick={copyLink}
                            className="h-12 bg-primary text-primary-foreground"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar link
                          </Button>
                          <Button 
                            onClick={() => window.open(generatedLink, '_blank')}
                            variant="outline"
                            className="h-12"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Abrir carta
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className={`rounded-xl border ${currentTheme.border} ${currentTheme.bg} p-6`}>
                          <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center relative p-2">
                            {/* Generate QR Code for carta link */}
                            <div className="text-center">
                              <QrCode className="w-20 h-20 mx-auto text-gray-800 mb-2" />
                              <p className="text-xs text-gray-600 font-medium">Escaneie para abrir</p>
                            </div>
                            {selectedQrStyle === "hearts" && (
                              <>
                                <Heart className={`absolute -top-2 -left-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                                <Heart className={`absolute -top-2 -right-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                                <Heart className={`absolute -bottom-2 -left-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                                <Heart className={`absolute -bottom-2 -right-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                              </>
                            )}
                          </div>
                          <p className="text-center text-sm text-white/80 mt-4">Escaneie para abrir a carta</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="h-12 bg-primary text-primary-foreground">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar QR
                          </Button>
                          <Button 
                            onClick={() => window.open(generatedLink, '_blank')}
                            variant="outline"
                            className="h-12"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver carta
                          </Button>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-center text-muted-foreground">
                      Para: {partnerName} | {selectedPlan === "unico" ? "Acesso permanente" : "Assinatura mensal"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            {!(currentStep === 7 && isPaid) && (
              <div className="flex items-center gap-3 mt-8 pt-4 border-t border-border/50">
                {currentStep > 1 && !isPaid && (
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    className="h-11 px-6 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Voltar
                  </Button>
                )}

                {/* Step counter in center */}
                <div className="flex-1 text-center text-sm text-muted-foreground">
                  {currentStep} de {TOTAL_STEPS}
                </div>
                
                {currentStep < TOTAL_STEPS ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20"
                  >
                    {currentStep === 6 ? "Finalizar" : "Continuar"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  !isPaid && !showPixPayment && (
                    <Button
                      onClick={handleCreatePayment}
                      disabled={isProcessingPayment || !customerEmail}
                      className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-lg shadow-primary/20 rounded-xl"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Gerando PIX...
                        </>
                      ) : (
                        <>
                          <Gift className="w-5 h-5 mr-2" />
                          Pagar R$ {getPaymentAmount().toFixed(2).replace('.', ',')}
                        </>
                      )}
                    </Button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Preview Section - Desktop */}
          <div className="hidden lg:block w-64 xl:w-72">
            <div className="sticky top-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-muted-foreground">Preview em tempo real</p>
              </div>
              
              {/* Card Preview or QR Preview */}
              {(currentStep === 6 || currentStep === 7) && shareMethod === "qr" ? (
                // QR Code Preview
                <div className="relative w-full max-w-[180px] mx-auto">
                  <div className="bg-card rounded-2xl p-4 border border-border shadow-lg">
                    <div className={`aspect-square rounded-xl ${currentTheme.bg} border-2 ${currentTheme.border} flex items-center justify-center mb-3 relative overflow-hidden`}>
                      <div className="w-24 h-24 bg-white rounded-lg p-2">
                        <div className="w-full h-full grid grid-cols-5 gap-0.5">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`${Math.random() > 0.5 ? "bg-gray-900" : "bg-transparent"} ${selectedQrStyle === "gradient" ? "bg-gradient-to-br from-primary to-primary/50" : ""}`}
                            />
                          ))}
                        </div>
                      </div>
                      {selectedQrStyle === "hearts" && (
                        <>
                          <Heart className={`absolute top-1 left-1 w-3 h-3 ${currentTheme.text} fill-current`} />
                          <Heart className={`absolute top-1 right-1 w-3 h-3 ${currentTheme.text} fill-current`} />
                          <Heart className={`absolute bottom-1 left-1 w-3 h-3 ${currentTheme.text} fill-current`} />
                          <Heart className={`absolute bottom-1 right-1 w-3 h-3 ${currentTheme.text} fill-current`} />
                        </>
                      )}
                    </div>
                    <p className="text-center text-xs text-muted-foreground">Escaneie para abrir</p>
                    <p className={`text-center text-sm font-medium ${currentTheme.text.replace("text-", "text-")}`}>
                      Para: {partnerName || "..."}
                    </p>
                  </div>
                </div>
              ) : (
                // Card Preview
                <div className="relative w-full max-w-[180px] mx-auto">
                  {/* Mini Phone Frame */}
                  <div className="relative w-full aspect-[9/18] bg-black rounded-2xl p-1 shadow-lg animate-glow-pulse">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-b-lg z-20 flex items-center justify-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-gray-700" />
                      <div className="w-1 h-1 rounded-full bg-gray-700" />
                    </div>
                    
                    {/* Phone Screen */}
                    <div className={`w-full h-full rounded-xl overflow-hidden bg-gradient-to-b ${currentTheme.gradient} relative`}>
                      <div className="absolute inset-0 p-2 pt-4 flex flex-col items-center overflow-hidden">
                        {/* Floating Decorations - Hearts pulsing */}
                        {selectedDecorations.includes("hearts") && (
                          <>
                            <Heart className={`absolute top-5 left-2 w-2.5 h-2.5 ${currentTheme.text} fill-current animate-heart-pulse`} />
                            <Heart className={`absolute top-8 right-3 w-2 h-2 ${currentTheme.text} fill-current animate-heart-pulse-fast`} />
                            <Heart className={`absolute bottom-16 left-3 w-2.5 h-2.5 ${currentTheme.text} fill-current animate-heart-pulse-slow`} />
                            <Heart className={`absolute top-14 left-1 w-1.5 h-1.5 ${currentTheme.text} fill-current animate-heart-pulse`} style={{ animationDelay: '0.3s' }} />
                            <Heart className={`absolute bottom-24 right-2 w-2 h-2 ${currentTheme.text} fill-current animate-heart-pulse-fast`} style={{ animationDelay: '0.6s' }} />
                            <Heart className={`absolute top-20 right-1 w-1.5 h-1.5 ${currentTheme.text} fill-current animate-heart-pulse-slow`} style={{ animationDelay: '0.2s' }} />
                            <Heart className={`absolute bottom-32 left-1 w-2 h-2 ${currentTheme.text} fill-current animate-heart-pulse`} style={{ animationDelay: '0.5s' }} />
                          </>
                        )}
                        {/* Stars falling */}
                        {selectedDecorations.includes("stars") && (
                          <>
                            <Star className={`absolute top-0 left-[20%] w-2 h-2 ${currentTheme.text} fill-current animate-star-fall-1`} />
                            <Star className={`absolute top-0 right-[15%] w-1.5 h-1.5 ${currentTheme.text} fill-current animate-star-fall-2`} />
                            <Star className={`absolute top-0 left-[50%] w-2 h-2 ${currentTheme.text} fill-current animate-star-fall-3`} />
                            <Star className={`absolute top-0 right-[40%] w-1.5 h-1.5 ${currentTheme.text} fill-current animate-star-fall-4`} />
                            <Star className={`absolute top-0 left-[70%] w-2 h-2 ${currentTheme.text} fill-current animate-star-fall-1`} style={{ animationDelay: '2s' }} />
                          </>
                        )}
                        {/* Sparkles moving randomly */}
                        {selectedDecorations.includes("sparkles") && (
                          <>
                            <Sparkles className={`absolute top-6 right-4 w-2.5 h-2.5 ${currentTheme.text} animate-sparkle-random-1`} />
                            <Sparkles className={`absolute bottom-20 right-2 w-2 h-2 ${currentTheme.text} animate-sparkle-random-2`} />
                            <Sparkles className={`absolute top-16 left-2 w-2.5 h-2.5 ${currentTheme.text} animate-sparkle-random-3`} />
                            <Sparkles className={`absolute bottom-28 left-1 w-2 h-2 ${currentTheme.text} animate-sparkle-random-4`} />
                            <Sparkles className={`absolute top-24 right-1 w-1.5 h-1.5 ${currentTheme.text} animate-sparkle-random-1`} style={{ animationDelay: '1.5s' }} />
                          </>
                        )}
                        {/* Flowers swaying */}
                        {selectedDecorations.includes("flowers") && (
                          <>
                            <Flower2 className={`absolute top-7 left-3 w-2.5 h-2.5 ${currentTheme.text} animate-sway`} />
                            <Flower2 className={`absolute bottom-24 right-3 w-2.5 h-2.5 ${currentTheme.text} animate-sway-delayed`} />
                            <Flower2 className={`absolute top-20 right-1 w-2 h-2 ${currentTheme.text} animate-sway`} style={{ animationDelay: '0.5s' }} />
                            <Flower2 className={`absolute bottom-32 left-2 w-2 h-2 ${currentTheme.text} animate-sway-delayed`} style={{ animationDelay: '0.3s' }} />
                          </>
                        )}

                        {/* Countdown if enabled */}
                        {countdownEnabled && togetherDate && daysTogether > 0 && (
                          <div className={`mb-2 px-2 py-0.5 rounded-full ${currentTheme.bg} border ${currentTheme.border}`}>
                            <p className={`text-[7px] ${currentTheme.text} font-medium`}>
                              {daysTogether} dias juntos
                            </p>
                          </div>
                        )}

                        {/* Header */}
                        <div className="text-center mb-2 mt-1">
                          <p className="text-[7px] text-white/50">Para</p>
                          <h1 className={`text-xs font-bold ${currentTheme.text} truncate max-w-[120px]`}>
                            {partnerName || "..."}
                          </h1>
                        </div>

                        {/* Photos Grid */}
                        {photos.length > 0 && (
                          <div className="w-full mb-2">
                            {timelineMode ? (
                              // Mini timeline view
                              <div className="relative pl-3">
                                <div className={`absolute left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b ${currentTheme.gradient}`} />
                                {photos.slice(0, 3).map((photo, index) => (
                                  <div key={index} className="relative mb-1 last:mb-0 flex items-center gap-1.5">
                                    <div className={`absolute -left-2 w-1.5 h-1.5 rounded-full ${
                                      selectedTheme === 'red' ? 'bg-red-500' :
                                      selectedTheme === 'pink' ? 'bg-pink-500' :
                                      selectedTheme === 'purple' ? 'bg-purple-500' :
                                      selectedTheme === 'blue' ? 'bg-blue-400' :
                                      'bg-amber-500'
                                    }`} />
                                    <div className="w-8 h-8 rounded overflow-hidden relative">
                                      <Image src={photo.url} alt="" fill className="object-cover" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              // Grid view
                              <div className="grid grid-cols-2 gap-0.5">
                                {photos.slice(0, 4).map((photo, index) => (
                                  <div 
                                    key={index} 
                                    className={`aspect-square rounded overflow-hidden relative ${currentTheme.border} border`}
                                  >
                                    <Image src={photo.url} alt="" fill className="object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Message Preview */}
                        <div className={`w-full p-1.5 rounded-md ${currentTheme.bg} border ${currentTheme.border} mb-2`}>
                          <p className="text-white/80 text-center text-[6px] font-serif italic leading-tight line-clamp-3">
                            {message ? `"${message.substring(0, 60)}..."` : '"Sua mensagem..."'}
                          </p>
                        </div>

                        {/* Music Player Mini */}
                        {musicUrl && (
                          <div className={`w-full p-1.5 rounded-md ${currentTheme.bg} border ${currentTheme.border} flex items-center gap-1.5`}>
                            <div className={`w-4 h-4 rounded-full bg-white/10 flex items-center justify-center ${currentTheme.text}`}>
                              <Music className="w-2 h-2" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="w-full h-0.5 bg-white/20 rounded-full">
                                <div className={`w-1/3 h-full ${currentTheme.bg} rounded-full`} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Sender */}
                        <div className="mt-auto pb-1 text-center">
                          <p className="text-[6px] text-white/40">De</p>
                          <p className={`text-[8px] font-medium ${currentTheme.text}`}>
                            {senderName || "..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Preview Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setShowMobilePreview(true)}
          className="rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg shadow-primary/30 animate-glow-pulse"
        >
          <Heart className="w-5 h-5 fill-current" />
        </Button>
      </div>

      {/* Mobile Preview Modal */}
      {showMobilePreview && (
        <div className="lg:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xs">
            <button
              onClick={() => setShowMobilePreview(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-card border border-border rounded-full flex items-center justify-center z-10"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
            
            {(currentStep === 6 || currentStep === 7) && shareMethod === "qr" ? (
              // QR Code Preview Mobile
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg mx-auto max-w-[200px]">
                <div className={`aspect-square rounded-xl ${currentTheme.bg} border-2 ${currentTheme.border} flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <div className="w-32 h-32 bg-white rounded-lg p-2">
                    <div className="w-full h-full grid grid-cols-6 gap-0.5">
                      {Array.from({ length: 36 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`${Math.random() > 0.5 ? "bg-gray-900" : "bg-transparent"} ${selectedQrStyle === "gradient" ? "bg-gradient-to-br from-primary to-primary/50" : ""}`}
                        />
                      ))}
                    </div>
                  </div>
                  {selectedQrStyle === "hearts" && (
                    <>
                      <Heart className={`absolute top-2 left-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                      <Heart className={`absolute top-2 right-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                      <Heart className={`absolute bottom-2 left-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                      <Heart className={`absolute bottom-2 right-2 w-4 h-4 ${currentTheme.text} fill-current`} />
                    </>
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground">Escaneie para abrir</p>
                <p className={`text-center text-base font-medium mt-1 ${currentTheme.text.replace("text-", "text-")}`}>
                  Para: {partnerName || "..."}
                </p>
              </div>
            ) : (
              // Card Preview Mobile
              <div className="relative w-full max-w-[200px] mx-auto">
                <div className="relative w-full aspect-[9/18] bg-gray-900 rounded-3xl p-1.5 shadow-xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-20" />
                  <div className={`w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b ${currentTheme.gradient} relative`}>
                    <div className="absolute inset-0 p-3 pt-5 flex flex-col items-center overflow-hidden">
                      {/* Hearts pulsing */}
                      {selectedDecorations.includes("hearts") && (
                        <>
                          <Heart className={`absolute top-6 left-3 w-3 h-3 ${currentTheme.text} fill-current animate-heart-pulse`} />
                          <Heart className={`absolute top-10 right-4 w-2.5 h-2.5 ${currentTheme.text} fill-current animate-heart-pulse-fast`} />
                          <Heart className={`absolute bottom-20 left-2 w-3 h-3 ${currentTheme.text} fill-current animate-heart-pulse-slow`} />
                          <Heart className={`absolute top-16 right-2 w-2 h-2 ${currentTheme.text} fill-current animate-heart-pulse`} style={{ animationDelay: '0.4s' }} />
                          <Heart className={`absolute bottom-32 right-3 w-2.5 h-2.5 ${currentTheme.text} fill-current animate-heart-pulse-fast`} style={{ animationDelay: '0.2s' }} />
                        </>
                      )}
                      {/* Stars falling */}
                      {selectedDecorations.includes("stars") && (
                        <>
                          <Star className={`absolute top-0 left-[25%] w-2.5 h-2.5 ${currentTheme.text} fill-current animate-star-fall-1`} />
                          <Star className={`absolute top-0 right-[20%] w-2 h-2 ${currentTheme.text} fill-current animate-star-fall-2`} />
                          <Star className={`absolute top-0 left-[60%] w-2.5 h-2.5 ${currentTheme.text} fill-current animate-star-fall-3`} />
                          <Star className={`absolute top-0 right-[45%] w-2 h-2 ${currentTheme.text} fill-current animate-star-fall-4`} />
                        </>
                      )}
                      {/* Sparkles random movement */}
                      {selectedDecorations.includes("sparkles") && (
                        <>
                          <Sparkles className={`absolute top-8 right-5 w-3 h-3 ${currentTheme.text} animate-sparkle-random-1`} />
                          <Sparkles className={`absolute bottom-28 right-3 w-2.5 h-2.5 ${currentTheme.text} animate-sparkle-random-2`} />
                          <Sparkles className={`absolute top-20 left-3 w-3 h-3 ${currentTheme.text} animate-sparkle-random-3`} />
                          <Sparkles className={`absolute bottom-36 left-2 w-2.5 h-2.5 ${currentTheme.text} animate-sparkle-random-4`} />
                        </>
                      )}
                      {/* Flowers swaying */}
                      {selectedDecorations.includes("flowers") && (
                        <>
                          <Flower2 className={`absolute top-12 left-2 w-3 h-3 ${currentTheme.text} animate-sway`} />
                          <Flower2 className={`absolute bottom-16 right-4 w-3 h-3 ${currentTheme.text} animate-sway-delayed`} />
                          <Flower2 className={`absolute top-24 right-2 w-2.5 h-2.5 ${currentTheme.text} animate-sway`} style={{ animationDelay: '0.5s' }} />
                        </>
                      )}
                      
                      {countdownEnabled && togetherDate && daysTogether > 0 && (
                        <div className={`mb-3 px-3 py-1 rounded-full ${currentTheme.bg} border ${currentTheme.border}`}>
                          <p className={`text-xs ${currentTheme.text} font-medium`}>
                            {daysTogether} dias juntos
                          </p>
                        </div>
                      )}

                      <div className="text-center mb-3">
                        <p className="text-[9px] text-white/50">Para</p>
                        <h1 className={`text-sm font-bold ${currentTheme.text}`}>
                          {partnerName || "..."}
                        </h1>
                      </div>

                      <div className={`w-full p-2 rounded-lg ${currentTheme.bg} border ${currentTheme.border} mb-3`}>
                        <p className="text-white/80 text-center text-[8px] font-serif italic leading-tight line-clamp-4">
                          {message ? `"${message.substring(0, 80)}..."` : '"Sua mensagem..."'}
                        </p>
                      </div>

                      <div className="mt-auto pb-2 text-center">
                        <p className="text-[8px] text-white/40">De</p>
                        <p className={`text-[10px] font-medium ${currentTheme.text}`}>
                          {senderName || "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggestions Modal */}
      {showSuggestionsModal && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-card rounded-2xl border border-border p-4 max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowSuggestionsModal(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
            
            <h2 className="text-lg font-bold text-foreground mb-1">Sugestoes de Mensagem</h2>
            <p className="text-xs text-muted-foreground mb-4">Escolha uma mensagem pronta ou use como inspiracao</p>
            
            <div className="space-y-3">
              {messageSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessage(suggestion.text)
                    setShowSuggestionsModal(false)
                  }}
                  className="w-full p-3 text-left bg-secondary rounded-xl hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-3 h-3 text-primary" />
                    <span className="font-medium text-sm text-foreground">{suggestion.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3">{suggestion.text.substring(0, 150)}...</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
