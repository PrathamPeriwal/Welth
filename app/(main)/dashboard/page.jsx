import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      <div className="animate-fade-in">
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      </div>

      {/* Dashboard Overview */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </div>

      {/* Accounts Grid */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Your Accounts
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <Card className="cursor-pointer border-dashed border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 bg-gray-50 dark:bg-gray-800 transition-all duration-300 card-hover">
              <CardContent className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 h-full pt-6 pb-6">
                <Plus className="h-12 w-12 mb-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" />
                <p className="text-sm font-medium">Add New Account</p>
              </CardContent>
            </Card>
          </CreateAccountDrawer>

          {accounts.length > 0 &&
            accounts?.map((account, index) => (
              <div
                key={account.id}
                className="animate-scale-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <AccountCard account={account} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
