import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  gradient?: string
}

const StatsCard = ({ title, value, change, changeType, icon, gradient }: StatsCardProps) => {
  const changeColors = {
    positive: "text-success",
    negative: "text-expense",
    neutral: "text-muted-foreground"
  }

  const changeIcons = {
    positive: <TrendingUp className="h-3 w-3" />,
    negative: <TrendingDown className="h-3 w-3" />,
    neutral: null
  }

  return (
    <Card className="relative overflow-hidden transition-smooth hover:shadow-medium animate-scale-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <div className={`flex items-center gap-1 text-xs ${changeColors[changeType]}`}>
              {changeIcons[changeType]}
              <span>{change}</span>
            </div>
          </div>
          <div className={`p-3 rounded-xl ${gradient || "bg-primary/10"}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Balance Total"
        value="$15,450.32"
        change="+12.5% desde el mes pasado"
        changeType="positive"
        icon={<Wallet className="h-6 w-6 text-primary" />}
        gradient="bg-primary/10"
      />
      <StatsCard
        title="Ingresos del Mes"
        value="$8,250.00"
        change="+8.2% desde el mes pasado"
        changeType="positive"
        icon={<TrendingUp className="h-6 w-6 text-success" />}
        gradient="bg-success/10"
      />
      <StatsCard
        title="Gastos del Mes"
        value="$4,825.67"
        change="-3.1% desde el mes pasado"
        changeType="positive"
        icon={<TrendingDown className="h-6 w-6 text-expense" />}
        gradient="bg-expense/10"
      />
      <StatsCard
        title="Meta de Ahorro"
        value="68%"
        change="$2,040 de $3,000"
        changeType="neutral"
        icon={<Target className="h-6 w-6 text-savings" />}
        gradient="bg-savings/10"
      />
    </div>
  )
}