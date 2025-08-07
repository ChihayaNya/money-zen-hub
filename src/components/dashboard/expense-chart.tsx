import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const expenseData = [
  { name: "Comida", value: 1200, color: "hsl(var(--expense))" },
  { name: "Transporte", value: 800, color: "hsl(var(--warning))" },
  { name: "Entretenimiento", value: 600, color: "hsl(var(--primary))" },
  { name: "Servicios", value: 900, color: "hsl(var(--success))" },
  { name: "Compras", value: 400, color: "hsl(var(--accent-foreground))" },
  { name: "Salud", value: 300, color: "hsl(var(--muted-foreground))" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-large">
        <p className="font-medium text-card-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ${data.value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function ExpenseChart() {
  const total = expenseData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Gastos por Categoría
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Distribución de gastos este mes
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend personalizada */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {expenseData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.name}
              </span>
              <span className="text-sm font-medium ml-auto">
                ${item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}