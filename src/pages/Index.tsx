import { MainLayout } from "@/components/layout/main-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { IncomeExpenseChart } from "@/components/dashboard/income-expense-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { FinancialTips } from "@/components/dashboard/financial-tips"
import { QuickActions } from "@/components/dashboard/quick-actions"

const Index = () => {
  return (
    <MainLayout 
      title="Dashboard" 
      subtitle="Resumen general de tus finanzas personales"
    >
      <div className="space-y-8">
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeExpenseChart />
          <ExpenseChart />
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <FinancialTips />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
