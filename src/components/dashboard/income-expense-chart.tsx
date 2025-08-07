import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyData = [
  { month: "Ene", ingresos: 7800, gastos: 4200 },
  { month: "Feb", ingresos: 8100, gastos: 4500 },
  { month: "Mar", ingresos: 7950, gastos: 4800 },
  { month: "Abr", ingresos: 8300, gastos: 4300 },
  { month: "May", ingresos: 8200, gastos: 4600 },
  { month: "Jun", ingresos: 8250, gastos: 4825 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-large">
        <p className="font-medium text-card-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey === "ingresos" ? "Ingresos" : "Gastos"}: ${entry.value.toLocaleString()}
          </p>
        ))}
        <p className="text-sm text-muted-foreground border-t border-border pt-1 mt-1">
          Balance: ${(payload[0].value - payload[1].value).toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function IncomeExpenseChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Ingresos vs Gastos
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparación mensual de los últimos 6 meses
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="ingresos" 
                fill="hsl(var(--success))" 
                radius={[4, 4, 0, 0]}
                name="Ingresos"
              />
              <Bar 
                dataKey="gastos" 
                fill="hsl(var(--expense))" 
                radius={[4, 4, 0, 0]}
                name="Gastos"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Resumen estadístico */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Promedio Ingresos</p>
            <p className="text-lg font-semibold text-success">$8,100</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Promedio Gastos</p>
            <p className="text-lg font-semibold text-expense">$4,538</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Balance Promedio</p>
            <p className="text-lg font-semibold text-success">$3,562</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}