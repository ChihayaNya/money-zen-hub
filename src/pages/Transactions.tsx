import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Calendar
} from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: "income" | "expense"
  account: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-06-15",
    description: "Salario Junio",
    category: "Salario",
    amount: 8250.00,
    type: "income",
    account: "Cuenta Principal"
  },
  {
    id: "2",
    date: "2024-06-14",
    description: "Supermercado Soriana",
    category: "Comida",
    amount: 234.50,
    type: "expense",
    account: "Tarjeta Débito"
  },
  {
    id: "3",
    date: "2024-06-13",
    description: "Gasolina Pemex",
    category: "Transporte",
    amount: 67.80,
    type: "expense",
    account: "Tarjeta Crédito"
  },
  {
    id: "4",
    date: "2024-06-12",
    description: "Freelance Proyecto",
    category: "Freelance",
    amount: 450.00,
    type: "income",
    account: "Cuenta Principal"
  },
  {
    id: "5",
    date: "2024-06-11",
    description: "Netflix",
    category: "Entretenimiento",
    amount: 15.99,
    type: "expense",
    account: "Tarjeta Crédito"
  },
  {
    id: "6",
    date: "2024-06-10",
    description: "Electricidad CFE",
    category: "Servicios",
    amount: 145.30,
    type: "expense",
    account: "Cuenta Principal"
  }
]

const categories = ["Todas", "Comida", "Transporte", "Entretenimiento", "Servicios", "Salario", "Freelance", "Compras", "Salud"]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedType, setSelectedType] = useState("todas")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || transaction.category === selectedCategory
    const matchesType = selectedType === "todas" || transaction.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <MainLayout 
      title="Transacciones" 
      subtitle="Registro completo de ingresos y gastos"
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Ingresos</p>
                  <p className="text-2xl font-bold text-success">${totalIncome.toLocaleString()}</p>
                </div>
                <ArrowUpCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Gastos</p>
                  <p className="text-2xl font-bold text-expense">${totalExpenses.toLocaleString()}</p>
                </div>
                <ArrowDownCircle className="h-8 w-8 text-expense" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Balance Neto</p>
                  <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-success' : 'text-expense'}`}>
                    ${(totalIncome - totalExpenses).toLocaleString()}
                  </p>
                </div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  totalIncome - totalExpenses >= 0 ? 'bg-success/10' : 'bg-expense/10'
                }`}>
                  {totalIncome - totalExpenses >= 0 ? 
                    <ArrowUpCircle className="h-5 w-5 text-success" /> : 
                    <ArrowDownCircle className="h-5 w-5 text-expense" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle className="text-lg font-semibold">Todas las Transacciones</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva Transacción
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border border-border z-50">
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Transacción</DialogTitle>
                      <DialogDescription>
                        Registra un nuevo ingreso o gasto en tu cuenta.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Tipo</Label>
                        <Select defaultValue="expense">
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border border-border z-50">
                            <SelectItem value="income">Ingreso</SelectItem>
                            <SelectItem value="expense">Gasto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Descripción</Label>
                        <Input id="description" className="col-span-3" placeholder="Ej: Compras supermercado" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">Cantidad</Label>
                        <Input id="amount" type="number" className="col-span-3" placeholder="0.00" />
                      </div>
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
                            <SelectItem value="salario">Salario</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">Notas</Label>
                        <Textarea id="notes" className="col-span-3" placeholder="Notas adicionales (opcional)" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Guardar Transacción</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar transacciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="income">Ingresos</SelectItem>
                    <SelectItem value="expense">Gastos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {new Date(transaction.date).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "income" ? (
                          <ArrowUpCircle className="h-4 w-4 text-success" />
                        ) : (
                          <ArrowDownCircle className="h-4 w-4 text-expense" />
                        )}
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {transaction.account}
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${
                      transaction.type === "income" ? "text-success" : "text-expense"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron transacciones que coincidan con los filtros.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}