"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Heart,
  Lock,
  LogOut,
  DollarSign,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Save,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface CartaItem {
  id: string
  partnerName: string
  senderName: string
  email: string
  isPaid: boolean
  status: string
  amountPaid?: number
  plan?: string
  selectedTheme: string
  photos: string[]
  timelineMode: boolean
  createdAt: string
}

interface PriceConfig {
  planoUnico: number
  planoMensal: number
  extraPhotos: number
  timelinePerPhoto: number
  decoration: number
  themeChange: number
}

interface Stats {
  totalCartas: number
  paidCartas: number
  editingCartas: number
  totalRevenue: number
  recentCartas: CartaItem[]
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [activeTab, setActiveTab] = useState<"overview" | "prices" | "users">("overview")
  const [stats, setStats] = useState<Stats | null>(null)
  const [prices, setPrices] = useState<PriceConfig | null>(null)
  const [isSavingPrices, setIsSavingPrices] = useState(false)
  const [pricesSaved, setPricesSaved] = useState(false)
  const [expandedCarta, setExpandedCarta] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "editing">("all")

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth")
      if (res.ok) {
        setIsAuthenticated(true)
      }
    } catch {
      // Not authenticated
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError("")

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        setUsername("")
        setPassword("")
      } else {
        setLoginError("Usuario ou senha invalidos")
      }
    } catch {
      setLoginError("Erro ao conectar. Tente novamente.")
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    setIsAuthenticated(false)
    setStats(null)
    setPrices(null)
  }

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }, [])

  const loadPrices = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/prices")
      if (res.ok) {
        const data = await res.json()
        setPrices(data)
      }
    } catch (error) {
      console.error("Error loading prices:", error)
    }
  }, [])

  const savePrices = async () => {
    if (!prices) return
    setIsSavingPrices(true)
    setPricesSaved(false)

    try {
      const res = await fetch("/api/admin/prices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prices),
      })

      if (res.ok) {
        setPricesSaved(true)
        setTimeout(() => setPricesSaved(false), 3000)
      }
    } catch (error) {
      console.error("Error saving prices:", error)
    } finally {
      setIsSavingPrices(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadStats()
      loadPrices()
    }
  }, [isAuthenticated, loadStats, loadPrices])

  const filteredCartas = stats?.recentCartas.filter((carta) => {
    if (filterStatus === "paid") return carta.isPaid
    if (filterStatus === "editing") return !carta.isPaid
    return true
  }) || []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-7 h-7 text-primary fill-primary" />
              <span className="text-2xl font-bold text-foreground font-serif">Lovra</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground mb-1">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">
              Acesso restrito ao administrador
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                <Label htmlFor="admin-user" className="text-sm font-medium text-foreground mb-1.5 block">
                  Usuario
                </Label>
                <Input
                  id="admin-user"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground h-10"
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="admin-pass" className="text-sm font-medium text-foreground mb-1.5 block">
                  Senha
                </Label>
                <Input
                  id="admin-pass"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground h-10"
                  autoComplete="current-password"
                />
              </div>

              {loginError && (
                <p className="text-sm text-destructive text-center">{loginError}</p>
              )}

              <Button
                type="submit"
                disabled={isLoggingIn || !username || !password}
                className="w-full h-11 bg-primary text-primary-foreground font-medium"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            <span className="text-lg font-bold text-foreground font-serif">Lovra</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              Admin
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground gap-1.5">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary/50 rounded-lg p-1 w-fit">
          {([
            { id: "overview" as const, label: "Visao Geral", icon: FileText },
            { id: "prices" as const, label: "Precos", icon: DollarSign },
            { id: "users" as const, label: "Usuarios", icon: Users },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Total Cartas</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats?.totalCartas || 0}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-muted-foreground">Pagos</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats?.paidCartas || 0}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-xs text-muted-foreground">Em Edicao</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stats?.editingCartas || 0}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Receita Total</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  R$ {(stats?.totalRevenue || 0).toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>

            {/* Recent cartas */}
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Cartas Recentes</h2>
                <Button variant="ghost" size="sm" onClick={loadStats} className="gap-1.5 text-muted-foreground">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Atualizar
                </Button>
              </div>
              {stats?.recentCartas && stats.recentCartas.length > 0 ? (
                <div className="divide-y divide-border">
                  {stats.recentCartas.slice(0, 10).map((carta) => (
                    <div key={carta.id} className="p-4 flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${carta.isPaid ? "bg-green-500" : "bg-amber-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          Para: {carta.partnerName} {carta.senderName ? `| De: ${carta.senderName}` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">{carta.email}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        carta.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {carta.isPaid ? "Pago" : "Editando"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(carta.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Nenhuma carta encontrada
                </div>
              )}
            </div>
          </div>
        )}

        {/* Prices Tab */}
        {activeTab === "prices" && prices && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Configuracao de Precos</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Altere os precos exibidos na plataforma. As mudancas serao aplicadas imediatamente.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">
                    Plano Unico (R$)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prices.planoUnico}
                    onChange={(e) => setPrices({ ...prices, planoUnico: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border text-foreground h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Pagamento unico, acesso permanente</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">
                    Plano Mensal (R$)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prices.planoMensal}
                    onChange={(e) => setPrices({ ...prices, planoMensal: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border text-foreground h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Assinatura mensal, recursos premium</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">
                    Fotos Extras (R$)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prices.extraPhotos}
                    onChange={(e) => setPrices({ ...prices, extraPhotos: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border text-foreground h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Preco para desbloquear +5 fotos</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">
                    Timeline por Foto (R$)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prices.timelinePerPhoto}
                    onChange={(e) => setPrices({ ...prices, timelinePerPhoto: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border text-foreground h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Preco por foto no modo Timeline</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">
                    Enfeite (R$)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prices.decoration}
                    onChange={(e) => setPrices({ ...prices, decoration: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border text-foreground h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Preco por enfeite animado</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground mb-1.5 block">
                    Troca de Tema (R$)
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prices.themeChange}
                    onChange={(e) => setPrices({ ...prices, themeChange: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary/50 border-border text-foreground h-10"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Preco para mudar do tema padrao</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button
                  onClick={savePrices}
                  disabled={isSavingPrices}
                  className="bg-primary text-primary-foreground gap-2"
                >
                  {isSavingPrices ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Salvar Precos
                    </>
                  )}
                </Button>
                {pricesSaved && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Precos atualizados
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {/* Filter */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {([
                  { id: "all" as const, label: "Todos" },
                  { id: "paid" as const, label: "Pagos" },
                  { id: "editing" as const, label: "Editando" },
                ]).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setFilterStatus(filter.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === filter.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={loadStats} className="gap-1.5 text-muted-foreground">
                <RefreshCw className="w-3.5 h-3.5" />
                Atualizar
              </Button>
            </div>

            {/* Users list */}
            <div className="rounded-xl border border-border bg-card divide-y divide-border">
              {filteredCartas.length > 0 ? (
                filteredCartas.map((carta) => (
                  <div key={carta.id}>
                    <button
                      onClick={() => setExpandedCarta(expandedCarta === carta.id ? null : carta.id)}
                      className="w-full p-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors text-left"
                    >
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${carta.isPaid ? "bg-green-500" : "bg-amber-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {carta.partnerName} {carta.senderName ? `(de ${carta.senderName})` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{carta.email || "Sem email"}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          carta.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {carta.isPaid ? "Pago" : "Editando"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(carta.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                        {expandedCarta === carta.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {expandedCarta === carta.id && (
                      <div className="px-4 pb-4 bg-secondary/20 animate-in fade-in duration-200">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-xs text-muted-foreground block">ID</span>
                            <span className="text-foreground font-mono text-xs">{carta.id}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Destinatario</span>
                            <span className="text-foreground">{carta.partnerName}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Remetente</span>
                            <span className="text-foreground">{carta.senderName || "Anonimo"}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Email</span>
                            <span className="text-foreground">{carta.email || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Tema</span>
                            <span className="text-foreground capitalize">{carta.selectedTheme}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Fotos</span>
                            <span className="text-foreground">{carta.photos?.length || 0} foto(s)</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Timeline</span>
                            <span className="text-foreground">{carta.timelineMode ? "Sim" : "Nao"}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Plano</span>
                            <span className="text-foreground capitalize">{carta.plan || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Valor Pago</span>
                            <span className="text-foreground">
                              {carta.amountPaid ? `R$ ${carta.amountPaid.toFixed(2).replace(".", ",")}` : "N/A"}
                            </span>
                          </div>
                        </div>
                        {carta.isPaid && (
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/carta/${carta.id}`, "_blank")}
                              className="gap-1.5 text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Ver Carta
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  {filterStatus === "all"
                    ? "Nenhuma carta encontrada"
                    : filterStatus === "paid"
                    ? "Nenhuma carta paga encontrada"
                    : "Nenhuma carta em edicao encontrada"}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
