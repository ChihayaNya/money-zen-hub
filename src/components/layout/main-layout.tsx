import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Bell, Search, User, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                
                {(title || subtitle) && (
                  <div>
                    {title && <h1 className="text-xl font-semibold text-foreground">{title}</h1>}
                    {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar transacciones..."
                    className="pl-10 w-64 bg-background/50"
                  />
                </div>
                
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-3 border-b border-border">
                      <h4 className="font-medium text-foreground">Notificaciones</h4>
                      <p className="text-sm text-muted-foreground">Tienes 3 nuevas notificaciones</p>
                    </div>
                    <DropdownMenuItem className="p-3">
                      <div>
                        <p className="font-medium text-sm">Presupuesto excedido</p>
                        <p className="text-xs text-muted-foreground">Has superado el 90% de tu presupuesto de comida</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3">
                      <div>
                        <p className="font-medium text-sm">Meta de ahorro</p>
                        <p className="text-xs text-muted-foreground">¡Felicidades! Alcanzaste el 70% de tu meta</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3">
                      <div>
                        <p className="font-medium text-sm">Recordatorio</p>
                        <p className="text-xs text-muted-foreground">No olvides registrar tus gastos de hoy</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center text-sm text-primary">
                      Ver todas las notificaciones
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="Usuario" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          JD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="p-2">
                      <p className="font-medium text-sm">Juan Pérez</p>
                      <p className="text-xs text-muted-foreground">juan@ejemplo.com</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Moon className="h-4 w-4 mr-2" />
                      Tema oscuro
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 bg-gradient-dashboard">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}