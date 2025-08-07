import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Target, CreditCard, PiggyBank, BarChart3 } from "lucide-react"

const quickActions = [
  {
    title: "Nueva Transacción",
    description: "Registrar ingreso o gasto",
    icon: Plus,
    color: "bg-primary/10 text-primary hover:bg-primary/20",
    action: "Agregar"
  },
  {
    title: "Crear Presupuesto",
    description: "Establecer límites de gasto",
    icon: Target,
    color: "bg-warning/10 text-warning hover:bg-warning/20",
    action: "Crear"
  },
  {
    title: "Meta de Ahorro",
    description: "Definir objetivo financiero",
    icon: PiggyBank,
    color: "bg-success/10 text-success hover:bg-success/20",
    action: "Establecer"
  },
  {
    title: "Ver Reportes",
    description: "Análisis detallado",
    icon: BarChart3,
    color: "bg-primary-light/10 text-primary-light hover:bg-primary-light/20",
    action: "Analizar"
  }
]

export function QuickActions() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Acciones Rápidas
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tareas comunes para gestionar tus finanzas
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="group p-4 rounded-lg border border-border hover:shadow-soft transition-smooth cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-lg transition-smooth ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="mt-2 h-7 px-2 text-xs"
                  >
                    {action.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Acciones adicionales */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <CreditCard className="h-3 w-3 mr-1" />
              Conectar Banco
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Importar CSV
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              Calculadora
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}