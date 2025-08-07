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
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  PiggyBank,
  Plus, 
  Target, 
  Calendar,
  TrendingUp,
  DollarSign,
  Edit,
  Trash2,
  CheckCircle,
  Clock
} from "lucide-react"
import { useState } from "react"

interface SavingsGoal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  priority: "high" | "medium" | "low"
  status: "active" | "completed" | "paused"
  monthlyContribution: number
}

const savingsGoals: SavingsGoal[] = [
  {
    id: "1",
    title: "Fondo de Emergencia",
    description: "6 meses de gastos para emergencias",
    targetAmount: 30000,
    currentAmount: 18500,
    deadline: "2024-12-31",
    category: "Emergencia",
    priority: "high",
    status: "active",
    monthlyContribution: 2000
  },
  {
    id: "2",
    title: "Vacaciones Europa",
    description: "Viaje a Europa para 2 personas",
    targetAmount: 45000,
    currentAmount: 12300,
    deadline: "2025-06-15",
    category: "Viajes",
    priority: "medium",
    status: "active",
    monthlyContribution: 3000
  },
  {
    id: "3",
    title: "Auto Nuevo",
    description: "Enganche para auto familiar",
    targetAmount: 80000,
    currentAmount: 35000,
    deadline: "2025-03-01",
    category: "Transporte",
    priority: "medium",
    status: "active",
    monthlyContribution: 5000
  },
  {
    id: "4",
    title: "Curso de Especialización",
    description: "Maestría en Administración",
    targetAmount: 15000,
    currentAmount: 15000,
    deadline: "2024-08-01",
    category: "Educación",
    priority: "high",
    status: "completed",
    monthlyContribution: 1500
  },
  {
    id: "5",
    title: "Renovación Casa",
    description: "Remodelación de cocina y baño",
    targetAmount: 60000,
    currentAmount: 8500,
    deadline: "2025-09-30",
    category: "Hogar",
    priority: "low",
    status: "active",
    monthlyContribution: 2500
  }
]

const categories = ["Emergencia", "Viajes", "Transporte", "Educación", "Hogar", "Inversión", "Otros"]

export default function SavingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const activeGoals = savingsGoals.filter(goal => goal.status === "active")
  const completedGoals = savingsGoals.filter(goal => goal.status === "completed")
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = savingsGoals.filter(goal => goal.status === "active").reduce((sum, goal) => sum + goal.targetAmount, 0)
  const monthlyContributions = activeGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive"
      case "medium": return "bg-warning/10 text-warning"
      case "low": return "bg-success/10 text-success"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success"
      case "active": return "text-primary"
      case "paused": return "text-muted-foreground"
      default: return "text-muted-foreground"
    }
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const target = new Date(deadline)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <MainLayout 
      title="Metas de Ahorro" 
      subtitle="Planifica y alcanza tus objetivos financieros"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Ahorrado</p>
                  <p className="text-2xl font-bold text-success">${totalSaved.toLocaleString()}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Meta Total Activa</p>
                  <p className="text-2xl font-bold text-primary">${totalTarget.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Metas Activas</p>
                  <p className="text-2xl font-bold text-foreground">{activeGoals.length}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ahorro Mensual</p>
                  <p className="text-2xl font-bold text-primary">${monthlyContributions.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5" />
              Progreso General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  ${totalSaved.toLocaleString()} de ${totalTarget.toLocaleString()}
                </span>
                <span className="font-medium text-primary">
                  {((totalSaved / totalTarget) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={(totalSaved / totalTarget) * 100} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{completedGoals.length} metas completadas</span>
                <span>${(totalTarget - totalSaved).toLocaleString()} restante</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Metas Activas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Objetivos de ahorro en progreso
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Meta
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border border-border z-50">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Meta de Ahorro</DialogTitle>
                  <DialogDescription>
                    Define un objetivo financiero específico con monto y fecha límite.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Título</Label>
                    <Input id="title" className="col-span-3" placeholder="Ej: Vacaciones en la playa" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="target" className="text-right">Meta ($)</Label>
                    <Input id="target" type="number" className="col-span-3" placeholder="0.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">Fecha límite</Label>
                    <Input id="deadline" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Categoría</Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border z-50">
                        {categories.map(category => (
                          <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="monthly" className="text-right">Ahorro mensual</Label>
                    <Input id="monthly" type="number" className="col-span-3" placeholder="0.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Descripción</Label>
                    <Textarea id="description" className="col-span-3" placeholder="Detalles adicionales (opcional)" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Crear Meta</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          
          <CardContent>
            <div className="grid gap-4">
              {activeGoals.map((goal) => {
                const percentage = getProgressPercentage(goal.currentAmount, goal.targetAmount)
                const remaining = goal.targetAmount - goal.currentAmount
                const daysLeft = getDaysRemaining(goal.deadline)
                
                return (
                  <Card key={goal.id} className="p-4 hover:shadow-soft transition-smooth">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{goal.title}</h4>
                          <Badge className={getPriorityColor(goal.priority)}>
                            {goal.priority === "high" ? "Alta" : goal.priority === "medium" ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {daysLeft > 0 ? `${daysLeft} días restantes` : "¡Fecha límite alcanzada!"}
                          </span>
                          <Badge variant="secondary">{goal.category}</Badge>
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
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          ${goal.currentAmount.toLocaleString()} de ${goal.targetAmount.toLocaleString()}
                        </span>
                        <span className="font-semibold text-primary">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      
                      <Progress value={percentage} className="h-2" />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Restante</p>
                          <p className="font-medium text-foreground">${remaining.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ahorro mensual</p>
                          <p className="font-medium text-success">${goal.monthlyContribution.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <Button size="sm" variant="outline" className="w-full">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Agregar Ahorro
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Metas Completadas
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                ¡Felicidades por alcanzar estos objetivos!
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {completedGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <h4 className="font-medium text-foreground">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">${goal.targetAmount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Completado</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}