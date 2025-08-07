import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Shield, Target, X } from "lucide-react"
import { useState } from "react"

interface FinancialTip {
  id: string
  title: string
  description: string
  type: "saving" | "investment" | "budget" | "emergency"
  priority: "high" | "medium" | "low"
  action?: string
}

const financialTips: FinancialTip[] = [
  {
    id: "1",
    title: "Fondo de emergencia",
    description: "Te recomendamos ahorrar 3-6 meses de gastos para emergencias. Actualmente tienes el equivalente a 2.1 meses.",
    type: "emergency",
    priority: "high",
    action: "Crear meta de ahorro"
  },
  {
    id: "2",
    title: "Optimiza tus gastos de comida",
    description: "Tus gastos en comida han aumentado 15% este mes. Considera cocinar más en casa para ahorrar.",
    type: "budget",
    priority: "medium",
    action: "Ver categoría"
  },
  {
    id: "3",
    title: "Oportunidad de inversión",
    description: "Con tu patrón de ahorro actual, podrías invertir $500 mensuales en un fondo de inversión.",
    type: "investment",
    priority: "medium",
    action: "Explorar opciones"
  },
  {
    id: "4",
    title: "¡Excelente progreso!",
    description: "Has reducido tus gastos de entretenimiento en un 20% comparado con el mes pasado.",
    type: "saving",
    priority: "low"
  }
]

const tipIcons = {
  saving: TrendingUp,
  investment: Target,
  budget: Lightbulb,
  emergency: Shield
}

const tipColors = {
  saving: "text-success bg-success/10",
  investment: "text-primary bg-primary/10",
  budget: "text-warning bg-warning/10",
  emergency: "text-expense bg-expense/10"
}

const priorityColors = {
  high: "bg-expense/10 text-expense",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success"
}

export function FinancialTips() {
  const [dismissedTips, setDismissedTips] = useState<string[]>([])

  const visibleTips = financialTips.filter(tip => !dismissedTips.includes(tip.id))

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => [...prev, tipId])
  }

  if (visibleTips.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-6 text-center">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hay consejos nuevos por ahora</p>
          <Button 
            variant="outline" 
            onClick={() => setDismissedTips([])}
            className="mt-4"
          >
            Restaurar consejos
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Consejos Financieros
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Recomendaciones personalizadas basadas en tus hábitos
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleTips.map((tip) => {
          const IconComponent = tipIcons[tip.type]
          const iconColorClass = tipColors[tip.type]
          const priorityColorClass = priorityColors[tip.priority]

          return (
            <div 
              key={tip.id}
              className="p-4 rounded-lg border border-border bg-card hover:shadow-soft transition-smooth"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${iconColorClass}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{tip.title}</h4>
                    <Badge className={`text-xs mt-1 ${priorityColorClass}`}>
                      {tip.priority === "high" ? "Alta prioridad" : 
                       tip.priority === "medium" ? "Prioridad media" : "Prioridad baja"}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissTip(tip.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {tip.description}
              </p>
              
              {tip.action && (
                <Button size="sm" variant="outline" className="text-xs">
                  {tip.action}
                </Button>
              )}
            </div>
          )
        })}
        
        <div className="pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full">
            Ver todos los consejos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}