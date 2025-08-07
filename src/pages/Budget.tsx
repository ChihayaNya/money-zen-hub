import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Edit,
  Trash2,
  Calendar
} from "lucide-react"
import { useState } from "react"

interface Budget {
  id: string
  category: string
  budgeted: number
  spent: number
  period: "monthly" | "weekly"
  color: string
  icon: string
}

const budgets: Budget[] = [
  {
    id: "1",
    category: "Comida",
    budgeted: 1500,
    spent: 1234.50,
    period: "monthly",
    color: "text-blue-600 bg-blue-100",
    icon: "🍕"
  },
  {
    id: "2",
    category: "Transporte",
    budgeted: 800,
    spent: 645.30,
    period: "monthly",
    color: "text-green-600 bg-green-100",
    icon: "🚗"
  },
  {
    id: "3",
    category: "Entretenimiento",
    budgeted: 400,
    spent: 456.78,
    period: "monthly",
    color: "text-orange-600 bg-orange-100",
    icon: "🎬"
  },
  {
    id: "4",
    category: "Servicios",
    budgeted: 1000,
    spent: 856.45,
    period: "monthly",
    color: "text-purple-600 bg-purple-100",
    icon: "⚡"
  },
  {
    id: "5",
    category: "Compras",
    budgeted: 600,
    spent: 234.67,
    period: "monthly",
    color: "text-pink-600 bg-pink-100",
    icon: "🛍️"
  },
  {
    id: "6",
    category: "Salud",
    budgeted: 300,
    spent: 145.20,
    period: "monthly",
    color: "text-red-600 bg-red-100",
    icon: "💊"
  }
]

export default function BudgetPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const overBudgetCount = budgets.filter(budget => budget.spent > budget.budgeted).length
  const onTrackCount = budgets.filter(budget => budget.spent <= budget.budgeted * 0.8).length

  const getProgressPercentage = (spent: number, budgeted: number) => {
    return Math.min((spent / budgeted) * 100, 100)
  }

  const getStatusColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100
    if (percentage >= 100) return "text-destructive"
    if (percentage >= 80) return "text-warning"
    return "text-success"
  }

  const getStatusIcon = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100
    if (percentage >= 100) return <AlertTriangle className="h-4 w-4 text-destructive" />
    if (percentage >= 80) return <Target className="h-4 w-4 text-warning" />
    return <CheckCircle className="h-4 w-4 text-success" />
  }

  return (
    <MainLayout 
      title="Presupuesto" 
      subtitle="Controla tus gastos con metas y límites personalizados"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Presupuestado</p>
                  <p className="text-2xl font-bold text-foreground">${totalBudgeted.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Gastado</p>
                  <p className="text-2xl font-bold text-expense">${totalSpent.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-expense" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disponible</p>
                  <p className="text-2xl font-bold text-success">${(totalBudgeted - totalSpent).toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Progreso General</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round((totalSpent / totalBudgeted) * 100)}%</p>
                </div>
                <div className="text-right">
                  <Progress value={(totalSpent / totalBudgeted) * 100} className="w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-success">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-success" />
                <div>
                  <p className="text-lg font-bold text-foreground">{onTrackCount}</p>
                  <p className="text-sm text-muted-foreground">Categorías en meta</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-warning">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-lg font-bold text-foreground">{budgets.length - overBudgetCount - onTrackCount}</p>
                  <p className="text-sm text-muted-foreground">Cerca del límite</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-lg font-bold text-foreground">{overBudgetCount}</p>
                  <p className="text-sm text-muted-foreground">Presupuesto excedido</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Presupuestos por Categoría</CardTitle>
              <p className="text-sm text-muted-foreground">
                Seguimiento mensual de tus límites de gasto
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Presupuesto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border border-border z-50">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Presupuesto</DialogTitle>
                  <DialogDescription>
                    Establece un límite de gasto para una categoría específica.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Categoría</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        <SelectItem value="comida">Comida</SelectItem>
                        <SelectItem value="transporte">Transporte</SelectItem>
                        <SelectItem value="entretenimiento">Entretenimiento</SelectItem>
                        <SelectItem value="servicios">Servicios</SelectItem>
                        <SelectItem value="compras">Compras</SelectItem>
                        <SelectItem value="salud">Salud</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Presupuesto</Label>
                    <Input id="amount" type="number" className="col-span-3" placeholder="0.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="period" className="text-right">Período</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Seleccionar período" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Crear Presupuesto</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-4">
              {budgets.map((budget) => {
                const percentage = getProgressPercentage(budget.spent, budget.budgeted)
                const remaining = budget.budgeted - budget.spent
                
                return (
                  <Card key={budget.id} className="p-4 hover:shadow-soft transition-smooth">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{budget.icon}</div>
                        <div>
                          <h4 className="font-medium text-foreground">{budget.category}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {budget.period === "monthly" ? "Mensual" : "Semanal"}
                            </Badge>
                            {getStatusIcon(budget.spent, budget.budgeted)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          ${budget.spent.toLocaleString()} de ${budget.budgeted.toLocaleString()}
                        </span>
                        <span className={getStatusColor(budget.spent, budget.budgeted)}>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      
                      <Progress 
                        value={percentage} 
                        className="h-2"
                      />
                      
                      <div className="flex justify-between text-xs">
                        <span className={remaining >= 0 ? "text-success" : "text-destructive"}>
                          {remaining >= 0 ? `$${remaining.toLocaleString()} disponible` : `$${Math.abs(remaining).toLocaleString()} excedido`}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round((new Date().getDate() / new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()) * 100)}% del mes
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}