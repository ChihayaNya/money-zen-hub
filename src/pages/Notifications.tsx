import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Target,
  X,
  Settings
} from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "warning" | "error" | "info"
  category: "budget" | "savings" | "transaction" | "reminder" | "achievement"
  timestamp: string
  read: boolean
  actionRequired?: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "¡Meta de ahorro alcanzada!",
    message: "Has completado tu meta de 'Curso de Especialización'. ¡Felicidades por ahorrar $15,000!",
    type: "success",
    category: "achievement",
    timestamp: "2024-06-15T10:30:00",
    read: false,
    actionRequired: false
  },
  {
    id: "2",
    title: "Presupuesto de comida excedido",
    message: "Has gastado $1,234 de $1,500 presupuestados para comida este mes (82%). Considera revisar tus gastos.",
    type: "warning",
    category: "budget",
    timestamp: "2024-06-15T09:15:00",
    read: false,
    actionRequired: true
  },
  {
    id: "3",
    title: "Recordatorio de registro",
    message: "No has registrado transacciones en los últimos 3 días. ¿Olvidaste algún gasto?",
    type: "info",
    category: "reminder",
    timestamp: "2024-06-14T18:00:00",
    read: false,
    actionRequired: true
  },
  {
    id: "4",
    title: "Nuevo ingreso detectado",
    message: "Se registró un ingreso de $8,250 en tu cuenta principal. ¿Es tu salario de junio?",
    type: "info",
    category: "transaction",
    timestamp: "2024-06-14T08:30:00",
    read: true,
    actionRequired: false
  },
  {
    id: "5",
    title: "Meta de ahorro en riesgo",
    message: "Tu meta 'Vacaciones Europa' necesita $3,200/mes para completarse a tiempo. Actualmente ahorras $3,000/mes.",
    type: "warning",
    category: "savings",
    timestamp: "2024-06-13T12:00:00",
    read: true,
    actionRequired: true
  },
  {
    id: "6",
    title: "Gasto inusual detectado",
    message: "Gastaste $450 en entretenimiento, superando tu promedio mensual de $320.",
    type: "warning",
    category: "budget",
    timestamp: "2024-06-12T20:45:00",
    read: true,
    actionRequired: false
  },
  {
    id: "7",
    title: "Progreso excelente",
    message: "Has mantenido tus gastos de transporte 15% por debajo del presupuesto durante 3 meses consecutivos.",
    type: "success",
    category: "achievement",
    timestamp: "2024-06-10T16:20:00",
    read: true,
    actionRequired: false
  },
  {
    id: "8",
    title: "Pago programado próximo",
    message: "Tu pago de electricidad ($145) está programado para mañana. Verifica que tengas fondos suficientes.",
    type: "info",
    category: "reminder",
    timestamp: "2024-06-09T10:00:00",
    read: true,
    actionRequired: false
  }
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [filter, setFilter] = useState<"all" | "unread" | "actionRequired">("all")

  const unreadCount = notificationList.filter(n => !n.read).length
  const actionRequiredCount = notificationList.filter(n => n.actionRequired && !n.read).length

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const dismissNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notificationList.filter(notification => {
    if (filter === "unread") return !notification.read
    if (filter === "actionRequired") return notification.actionRequired && !notification.read
    return true
  })

  const getNotificationIcon = (type: string, category: string) => {
    if (category === "achievement") return <CheckCircle className="h-5 w-5 text-success" />
    
    switch (type) {
      case "success": return <CheckCircle className="h-5 w-5 text-success" />
      case "warning": return <AlertTriangle className="h-5 w-5 text-warning" />
      case "error": return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "info": return <Bell className="h-5 w-5 text-primary" />
      default: return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "budget": return "bg-warning/10 text-warning"
      case "savings": return "bg-success/10 text-success"
      case "transaction": return "bg-primary/10 text-primary"
      case "reminder": return "bg-muted text-muted-foreground"
      case "achievement": return "bg-success/10 text-success"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Hace menos de 1 hora"
    if (diffInHours < 24) return `Hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Hace ${diffInDays} ${diffInDays === 1 ? "día" : "días"}`
    
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short',
      year: diffInDays > 365 ? 'numeric' : undefined
    })
  }

  return (
    <MainLayout 
      title="Notificaciones" 
      subtitle="Mantente al día con alertas y recordatorios financieros"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Notificaciones</p>
                  <p className="text-2xl font-bold text-foreground">{notificationList.length}</p>
                </div>
                <Bell className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sin Leer</p>
                  <p className="text-2xl font-bold text-warning">{unreadCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Requieren Acción</p>
                  <p className="text-2xl font-bold text-destructive">{actionRequiredCount}</p>
                </div>
                <Target className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle className="text-lg font-semibold">Centro de Notificaciones</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Todas ({notificationList.length})
                </Button>
                <Button
                  variant={filter === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("unread")}
                >
                  Sin leer ({unreadCount})
                </Button>
                <Button
                  variant={filter === "actionRequired" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("actionRequired")}
                >
                  Acción requerida ({actionRequiredCount})
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Marcar todas como leídas
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {filter === "unread" 
                    ? "¡Excelente! No tienes notificaciones sin leer."
                    : filter === "actionRequired"
                    ? "No hay notificaciones que requieran acción."
                    : "No hay notificaciones en este momento."
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`p-4 transition-smooth hover:shadow-soft ${
                      !notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type, notification.category)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getCategoryColor(notification.category)}>
                              {notification.category === "budget" ? "Presupuesto" :
                               notification.category === "savings" ? "Ahorros" :
                               notification.category === "transaction" ? "Transacción" :
                               notification.category === "reminder" ? "Recordatorio" :
                               notification.category === "achievement" ? "Logro" : notification.category}
                            </Badge>
                            
                            {notification.actionRequired && (
                              <Badge variant="destructive" className="text-xs">
                                Acción requerida
                              </Badge>
                            )}
                            
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(notification.timestamp)}
                            </div>
                          </div>
                          
                          {notification.actionRequired && !notification.read && (
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline">
                                Ver detalles
                              </Button>
                              <Button size="sm">
                                {notification.category === "budget" ? "Revisar presupuesto" :
                                 notification.category === "savings" ? "Ajustar meta" :
                                 notification.category === "reminder" ? "Registrar gastos" : "Tomar acción"}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 ml-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de Notificaciones
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Personaliza qué alertas y recordatorios quieres recibir
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Alertas de Presupuesto</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Cuando supere el 80% del presupuesto</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Cuando exceda el presupuesto</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Gastos inusuales detectados</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Recordatorios</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Registro diario de gastos</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Metas de ahorro próximas a vencer</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Resumen semanal por email</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <Button>Guardar Configuración</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}