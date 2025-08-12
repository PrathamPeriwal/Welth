"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="card-hover bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      <Link href={`/account/${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold capitalize text-gray-900 dark:text-white">
                {name}
              </CardTitle>
              {isDefault && (
                <Badge variant="secondary" className="text-xs mt-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  Default
                </Badge>
              )}
            </div>
          </div>
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
        </CardHeader>

        <CardContent className="pb-4">
          <div className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>

        <CardFooter className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <ArrowUpRight className="h-4 w-4" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
            <ArrowDownRight className="h-4 w-4" />
            <span>Expense</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
