"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
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
  Copy,
  Calendar,
  Edit3,
  Gift,
  Zap,
  Flower2,
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

const TOTAL_STEPS = 5

export default function CriarCartaPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRelationship, setSelectedRelationship] = useState("")
  const [showOtherRelationships, setShowOtherRelationships] = useState(false)
  const [partnerName, setPartnerName] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("red")
  const [photos, setPhotos] = useState<string[]>([])
  const [musicUrl, setMusicUrl] = useState("")
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>(["hearts"])
  const [selectedQrStyle, setSelectedQrStyle] = useState("simple")
  const [shareMethod, setShareMethod] = useState<"qr" | "link">("link")
  const [selectedPlan, setSelectedPlan] = useState<"mensal" | "anual">("mensal")
  const [countdownEnabled, setCountdownEnabled] = useState(false)
  const [togetherDate, setTogetherDate] = useState("")
  const [offerTimeLeft, setOfferTimeLeft] = useState(3600)
  const [showTransition, setShowTransition] = useState(false)
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false)

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
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      if (currentStep === 4) {
        setShowTransition(true)
        setTimeout(() => {
          setShowTransition(false)
          setCurrentStep(5)
        }, 3000)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
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
        return "Ultimo passo!"
      default:
        return ""
    }
  }

  const handlePhotoUpload = () => {
    const newPhoto = `photo-${Date.now()}`
    setPhotos([...photos, newPhoto])
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

  // Transition Animation Screen
  if (showTransition) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="relative mb-8">
            <div className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${currentTheme.gradient} border-2 ${currentTheme.border} flex items-center justify-center animate-pulse`}>
              <Gift className={`w-16 h-16 ${currentTheme.text}`} />
            </div>
            {selectedDecorations.includes("hearts") && (
              <>
                <Heart className={`absolute -top-4 -left-4 w-6 h-6 ${currentTheme.text} fill-current animate-bounce`} style={{ animationDelay: "0s" }} />
                <Heart className={`absolute -top-2 -right-6 w-4 h-4 ${currentTheme.text} fill-current animate-bounce`} style={{ animationDelay: "0.3s" }} />
                <Heart className={`absolute -bottom-3 -left-6 w-5 h-5 ${currentTheme.text} fill-current animate-bounce`} style={{ animationDelay: "0.6s" }} />
              </>
            )}
            {selectedDecorations.includes("stars") && (
              <>
                <Star className={`absolute top-0 right-0 w-5 h-5 ${currentTheme.text} fill-current animate-pulse`} style={{ animationDelay: "0.2s" }} />
                <Star className={`absolute bottom-4 -right-4 w-4 h-4 ${currentTheme.text} fill-current animate-pulse`} style={{ animationDelay: "0.5s" }} />
              </>
            )}
            {selectedDecorations.includes("sparkles") && (
              <>
                <Sparkles className={`absolute -top-6 left-1/2 w-5 h-5 ${currentTheme.text} animate-pulse`} style={{ animationDelay: "0.1s" }} />
                <Sparkles className={`absolute bottom-0 -left-8 w-4 h-4 ${currentTheme.text} animate-pulse`} style={{ animationDelay: "0.4s" }} />
              </>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Sua carta esta ficando linda!</h2>
          <p className={`${currentTheme.text} text-lg mb-4`}>Para: {partnerName}</p>
          
          <div className={`max-w-sm mx-auto p-4 rounded-xl ${currentTheme.bg} border ${currentTheme.border} mb-6`}>
            <p className="text-white/80 text-sm italic line-clamp-3">"{message.substring(0, 100)}..."</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Preparando o ultimo passo...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo and Animated Hearts */}
      <header className="py-3 px-4 md:px-6 flex items-center justify-between border-b border-border relative">
        <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Inicio</span>
        </Link>

        {/* Centered Logo with Animated Hearts */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="relative">
            <Heart 
              className="absolute -top-2 -left-3 w-3 h-3 text-primary/60 fill-primary/60 animate-bounce" 
              style={{ animationDelay: "0s", animationDuration: "2s" }} 
            />
            <Heart 
              className="absolute -top-1 -right-4 w-2.5 h-2.5 text-primary/40 fill-primary/40 animate-bounce" 
              style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} 
            />
            <Heart 
              className="absolute -bottom-1 -left-4 w-2 h-2 text-primary/50 fill-primary/50 animate-bounce" 
              style={{ animationDelay: "1s", animationDuration: "2.2s" }} 
            />
            <Heart 
              className="absolute -bottom-2 -right-3 w-2.5 h-2.5 text-primary/30 fill-primary/30 animate-bounce" 
              style={{ animationDelay: "0.3s", animationDuration: "1.8s" }} 
            />
            <Heart className="w-6 h-6 text-primary fill-primary" />
          </div>
          <span className="text-lg font-bold text-foreground">Lovra</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Seguro</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-muted h-1">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-4 md:py-6">
        {/* Step Indicator */}
        <div className="text-center mb-4 md:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm text-primary mb-2">
            <span className="font-medium">
              {currentStep === TOTAL_STEPS ? "Ultimo passo!" : `Etapa ${currentStep} de ${TOTAL_STEPS}`}
            </span>
          </div>
          <h1 className="text-lg md:text-2xl font-bold text-foreground text-balance">
            {getStepTitle()}
          </h1>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {mainRelationshipTypes.map((type) => {
                      const IconComponent = type.icon
                      const isSelected = selectedRelationship === type.id
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedRelationship(type.id)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border bg-card text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <IconComponent className={`w-5 h-5 ${isSelected ? "text-primary" : ""}`} />
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
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-5 text-center hover:border-primary/50 cursor-pointer transition-colors"
                  onClick={handlePhotoUpload}
                >
                  <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-foreground font-medium mb-1 text-sm">
                    Toque para adicionar fotos
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG ate 10MB (opcional)
                  </p>
                </div>

                {photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {photos.map((_, index) => (
                      <div key={index} className="aspect-square bg-secondary rounded-lg flex items-center justify-center relative">
                        <Heart className="w-5 h-5 text-primary/30" />
                        <button
                          onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
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
                    Enfeites
                  </Label>
                  <div className="flex flex-wrap gap-2">
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
                          <IconComponent className="w-3 h-3" />
                          {decoration.label}
                        </button>
                      )
                    })}
                  </div>
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

            {/* Step 5: Payment & Sharing */}
            {currentStep === 5 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Offer Timer */}
                <div className="bg-primary text-primary-foreground rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">Oferta Limitada</span>
                  </div>
                  <span className="text-sm font-bold">Termina em {formatTime(offerTimeLeft)}</span>
                </div>

                {/* Plan Selection */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground text-center">Escolha seu plano</p>
                  
                  {/* Mensal - Popular */}
                  <button
                    onClick={() => setSelectedPlan("mensal")}
                    className={`w-full p-3 rounded-xl border-2 transition-all text-left relative ${
                      selectedPlan === "mensal"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="absolute -top-2 right-3 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
                      Mais Popular
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">Mensal</p>
                        <p className="text-xs text-muted-foreground">Acesso por 30 dias</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">R$ 19,90</p>
                        <p className="text-xs text-muted-foreground line-through">R$ 39,90</p>
                      </div>
                    </div>
                  </button>

                  {/* Anual */}
                  <button
                    onClick={() => setSelectedPlan("anual")}
                    className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                      selectedPlan === "anual"
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">Anual</p>
                        <p className="text-xs text-muted-foreground">Melhor valor - 12 meses</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">R$ 29,90</p>
                        <p className="text-xs text-muted-foreground line-through">R$ 59,90</p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Sharing Options */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Como quer compartilhar?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShareMethod("link")}
                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                        shareMethod === "link"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <Link2 className="w-5 h-5 text-primary" />
                      <span className="text-xs font-medium text-foreground">Link</span>
                    </button>
                    <button
                      onClick={() => setShareMethod("qr")}
                      className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                        shareMethod === "qr"
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-primary" />
                      <span className="text-xs font-medium text-foreground">QR Code</span>
                    </button>
                  </div>

                  {shareMethod === "qr" && (
                    <div className="mt-2 animate-in fade-in duration-200">
                      <p className="text-xs text-muted-foreground mb-1.5">Estilo do QR Code:</p>
                      <div className="flex gap-2">
                        {qrCodeStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedQrStyle(style.id)}
                            className={`flex-1 p-2 rounded-lg border text-center transition-all ${
                              selectedQrStyle === style.id
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-card text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <span className="text-xs font-medium">{style.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => goToStep(1)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Editar minha carta
                </button>

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
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 mt-6">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1 h-11 bg-transparent border-border text-foreground hover:bg-secondary"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
              )}
              
              {currentStep < TOTAL_STEPS ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Finalizar por R$ {selectedPlan === "mensal" ? "19,90" : "29,90"}
                </Button>
              )}
            </div>
          </div>

          {/* Preview Section - Desktop */}
          <div className="hidden lg:block w-64 xl:w-72">
            <div className="sticky top-4">
              <p className="text-xs text-muted-foreground text-center mb-2">Pre-visualizacao ao vivo</p>
              
              {/* Card Preview or QR Preview */}
              {currentStep === 5 && shareMethod === "qr" ? (
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
                  <div className="relative w-full aspect-[9/18] bg-gray-900 rounded-2xl p-1 shadow-lg">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-gray-900 rounded-b-lg z-20" />
                    
                    {/* Phone Screen */}
                    <div className={`w-full h-full rounded-xl overflow-hidden bg-gradient-to-b ${currentTheme.gradient} relative`}>
                      <div className="absolute inset-0 p-2 pt-4 flex flex-col items-center overflow-hidden">
                        {/* Floating Decorations */}
                        {selectedDecorations.includes("hearts") && (
                          <>
                            <Heart className={`absolute top-5 left-2 w-2 h-2 ${currentTheme.text} fill-current opacity-70 animate-bounce`} style={{ animationDelay: "0s", animationDuration: "2s" }} />
                            <Heart className={`absolute top-8 right-3 w-1.5 h-1.5 ${currentTheme.text} fill-current opacity-50 animate-bounce`} style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
                            <Heart className={`absolute bottom-16 left-3 w-2 h-2 ${currentTheme.text} fill-current opacity-60 animate-bounce`} style={{ animationDelay: "1s", animationDuration: "2.2s" }} />
                          </>
                        )}
                        {selectedDecorations.includes("stars") && (
                          <>
                            <Star className={`absolute top-6 right-2 w-2 h-2 ${currentTheme.text} fill-current opacity-70 animate-pulse`} style={{ animationDelay: "0.2s" }} />
                            <Star className={`absolute top-12 left-4 w-1.5 h-1.5 ${currentTheme.text} fill-current opacity-50 animate-pulse`} style={{ animationDelay: "0.7s" }} />
                          </>
                        )}
                        {selectedDecorations.includes("sparkles") && (
                          <>
                            <Sparkles className={`absolute top-4 right-4 w-2.5 h-2.5 ${currentTheme.text} opacity-60 animate-pulse`} style={{ animationDelay: "0.3s" }} />
                            <Sparkles className={`absolute bottom-20 right-2 w-2 h-2 ${currentTheme.text} opacity-50 animate-pulse`} style={{ animationDelay: "0.8s" }} />
                          </>
                        )}
                        {selectedDecorations.includes("flowers") && (
                          <>
                            <Flower2 className={`absolute top-7 left-3 w-2 h-2 ${currentTheme.text} opacity-60 animate-pulse`} style={{ animationDelay: "0.4s" }} />
                            <Flower2 className={`absolute bottom-24 right-3 w-2 h-2 ${currentTheme.text} opacity-50 animate-pulse`} style={{ animationDelay: "0.9s" }} />
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
                            <div className="grid grid-cols-2 gap-0.5">
                              {photos.slice(0, 2).map((_, index) => (
                                <div 
                                  key={index} 
                                  className={`aspect-square rounded ${currentTheme.bg} border ${currentTheme.border} flex items-center justify-center`}
                                >
                                  <Heart className={`w-3 h-3 ${currentTheme.text} opacity-30`} />
                                </div>
                              ))}
                            </div>
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
      <div className="lg:hidden fixed bottom-4 right-4">
        <Button
          onClick={() => setShowMobilePreview(true)}
          className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg"
        >
          <Heart className="w-5 h-5" />
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
            
            {currentStep === 5 && shareMethod === "qr" ? (
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
                      {selectedDecorations.includes("hearts") && (
                        <>
                          <Heart className={`absolute top-6 left-3 w-3 h-3 ${currentTheme.text} fill-current opacity-70 animate-bounce`} style={{ animationDelay: "0s", animationDuration: "2s" }} />
                          <Heart className={`absolute top-10 right-4 w-2 h-2 ${currentTheme.text} fill-current opacity-50 animate-bounce`} style={{ animationDelay: "0.5s", animationDuration: "2.5s" }} />
                        </>
                      )}
                      {selectedDecorations.includes("stars") && (
                        <>
                          <Star className={`absolute top-8 right-3 w-2.5 h-2.5 ${currentTheme.text} fill-current opacity-70 animate-pulse`} />
                        </>
                      )}
                      {selectedDecorations.includes("sparkles") && (
                        <>
                          <Sparkles className={`absolute top-5 right-5 w-3 h-3 ${currentTheme.text} opacity-60 animate-pulse`} />
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
