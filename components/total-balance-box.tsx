import { Card, CardContent } from "@/components/ui/card";
import { formatAmount } from "@/lib/utils";
import AnimatedCounter from "./animated-counter";
import DoughnutChart from "./doughnut-chart";

export default function TotalBalanceBox({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) {
  return (
    <Card className="max-w-2xl mt-4">
      <CardContent className="flex gap-6 items-center">
        <div className="flex size-full max-w-25 items-center sm:max-w-30 ">
          <DoughnutChart accounts={accounts} />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-lg">Bank Accounts:{totalBanks}</h2>
          <div>
            <p className=" font-bold text-gray-700">Total Current Balance</p>
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
