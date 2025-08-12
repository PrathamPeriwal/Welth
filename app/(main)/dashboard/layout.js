import DashboardPage from "./page";
import { LoadingCard } from "@/components/loading";
import { Suspense } from "react";

const DashboardSkeleton = () => (
  <div className="space-y-6">
    <LoadingCard />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  </div>
);

export default function Layout() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Welcome back! Here&apos;s your financial overview.
          </p>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardPage />
      </Suspense>
    </div>
  );
}
