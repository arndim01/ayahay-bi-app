import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface AccountsPayableItem {
  period: string;
  amount: number;
  percentage: number;
  status: "current" | "warning" | "overdue" | "critical";
}

interface AccountsPayableCardProps {
  accountsPayable?: AccountsPayableItem[];
}

export const AccountsPayableCard: React.FC<AccountsPayableCardProps> = ({ accountsPayable }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts Payable Aging</CardTitle>
        <CardDescription>Outstanding vendor payments by age</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accountsPayable?.map((account) => (
            <div
              key={account.period}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                {account.status === "current" && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {account.status === "warning" && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
                {(account.status === "overdue" || account.status === "critical") && (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
                <span className="font-medium">{account.period}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">
                  {account.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-sm text-muted-foreground">{account.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default AccountsPayableCard;