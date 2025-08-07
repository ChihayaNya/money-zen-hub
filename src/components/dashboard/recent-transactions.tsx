import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpCircle, ArrowDownCircle, MoreHorizontal } from "lucide-react"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    description: "Salario Mayo",
    amount: 8250.00,
    type: "income",
    category: "Salario",
    date: "2024-05-31"
  },
  {
    id: "2",
    description: "Supermercado Walmart",
    amount: 156.78,
    type: "expense",
    category: "Comida",
    date: "2024-05-30"
  },
  {
    id: "3",
    description: "Netflix Suscripción",
    amount: 15.99,
    type: "expense",
    category: "Entretenimiento",
    date: "2024-05-29"
  },
  {
    id: "4",
    description: "Gasolina Shell",
    amount: 45.50,
    type: "expense",
    category: "Transporte",
    date: "2024-05-28"
  },
  {
    id: "5",
    description: "Venta Online",
    amount: 230.00,
    type: "income",
    category: "Freelance",
    date: "2024-05-27"
  },
  {
    id: "6",
    description: "Electricidad CFE",
    amount: 89.45,
    type: "expense",
    category: "Servicios",
    date: "2024-05-26"
  }
]

export function RecentTransactions() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Transacciones Recientes
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Últimas 6 transacciones registradas
          </p>
        </div>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-smooth"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === "income" 
                  ? "bg-success/10" 
                  : "bg-expense/10"
              }`}>
                {transaction.type === "income" ? (
                  <ArrowUpCircle className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDownCircle className="h-4 w-4 text-expense" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-2 py-0.5"
                  >
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short'
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${
                transaction.type === "income" 
                  ? "text-success" 
                  : "text-expense"
              }`}>
                {transaction.type === "income" ? "+" : "-"}
                ${transaction.amount.toLocaleString()}
              </span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total ingresos:</span>
            <span className="font-medium text-success">+$8,480.00</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">Total gastos:</span>
            <span className="font-medium text-expense">-$307.72</span>
          </div>
          <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border">
            <span className="text-foreground">Balance neto:</span>
            <span className="text-success">+$8,172.28</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}