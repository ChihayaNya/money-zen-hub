import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  User,
  Shield,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Camera
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    budget: true,
    savings: true,
    transactions: false,
    weekly: true,
    monthly: true,
    email: false
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <MainLayout 
      title="Configuración" 
      subtitle="Personaliza tu experiencia en FinanControl"
    >
      <div className="max-w-4xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Preferencias
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Actualiza tu información básica y foto de perfil
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" alt="Foto de perfil" />
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        JP
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Cambiar foto
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG o GIF. Máximo 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Personal Info Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="Juan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" defaultValue="Pérez" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" defaultValue="juan@ejemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" defaultValue="+52 555 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Ocupación</Label>
                      <Input id="occupation" defaultValue="Ingeniero de Software" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income">Ingreso mensual</Label>
                      <Input id="income" type="number" defaultValue="25000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Cuéntanos un poco sobre ti..."
                      defaultValue="Apasionado por la tecnología y las finanzas personales. Me gusta mantener un control estricto de mis gastos y planificar para el futuro."
                    />
                  </div>

                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar cambios
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Mantén tu cuenta segura con una contraseña fuerte
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña actual</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPassword ? "text" : "password"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva contraseña</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Actualizar contraseña</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autenticación de Dos Factores</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Agrega una capa extra de seguridad a tu cuenta
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS</h4>
                      <p className="text-sm text-muted-foreground">
                        Recibe códigos por mensaje de texto
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">App Autenticadora</h4>
                      <p className="text-sm text-muted-foreground">
                        Usa Google Authenticator o similar
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesiones Activas</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gestiona los dispositivos donde has iniciado sesión
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">MacBook Pro</h4>
                        <p className="text-sm text-muted-foreground">
                          Chrome • Ciudad de México • Activa ahora
                        </p>
                      </div>
                      <Badge variant="secondary">Actual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">iPhone 15</h4>
                        <p className="text-sm text-muted-foreground">
                          Safari • Ciudad de México • Hace 2 horas
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Cerrar sesión
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alertas de Presupuesto</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configura cuándo recibir notificaciones sobre tus presupuestos
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Presupuesto al 80%</h4>
                      <p className="text-sm text-muted-foreground">
                        Alerta cuando uses el 80% de tu presupuesto
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.budget}
                      onCheckedChange={(value) => handleNotificationChange("budget", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Presupuesto excedido</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificación cuando superes tu presupuesto
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.budget}
                      onCheckedChange={(value) => handleNotificationChange("budget", value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metas de Ahorro</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Recibe recordatorios sobre tus objetivos de ahorro
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Progreso de metas</h4>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones semanales sobre tu progreso
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.savings}
                      onCheckedChange={(value) => handleNotificationChange("savings", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Metas completadas</h4>
                      <p className="text-sm text-muted-foreground">
                        Celebra cuando alcances tus objetivos
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.savings}
                      onCheckedChange={(value) => handleNotificationChange("savings", value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resúmenes por Email</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Recibe informes periódicos en tu correo electrónico
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Resumen semanal</h4>
                      <p className="text-sm text-muted-foreground">
                        Todos los lunes por la mañana
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.weekly}
                      onCheckedChange={(value) => handleNotificationChange("weekly", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Resumen mensual</h4>
                      <p className="text-sm text-muted-foreground">
                        El primer día de cada mes
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.monthly}
                      onCheckedChange={(value) => handleNotificationChange("monthly", value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apariencia</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Personaliza cómo se ve tu aplicación
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tema" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moneda</Label>
                    <Select defaultValue="mxn">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar moneda" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        <SelectItem value="mxn">Peso Mexicano (MXN)</SelectItem>
                        <SelectItem value="usd">Dólar Estadounidense (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="es">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Datos y Privacidad</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gestiona tu información y privacidad
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Análisis de uso</h4>
                      <p className="text-sm text-muted-foreground">
                        Ayuda a mejorar la aplicación compartiendo datos anónimos
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar mis datos
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Importar datos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Acciones irreversibles para tu cuenta
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar todos los datos
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar cuenta permanentemente
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}