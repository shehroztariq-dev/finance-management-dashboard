"use client";

import HeaderBox from "@/components/header-box";
import RightSidebar from "@/components/right-sidebar";
import TotalBalanceBox from "@/components/total-balance-box";

export default function Home() {
  const user = { firstName: "Shehroz", email: "shehroz@gmail.com" };
  return (
    <section className="no-scrollbar flex w-full gap-8  xl:max-h-screen xl:overflow-y-scroll">
      <div className="flex-1 min-w-0 p-10">
        <HeaderBox
          type="greeting"
          title="Welcome"
          subtext="Access and manage your account and transactions effectively"
        />
        <TotalBalanceBox accounts={[]} totalBanks={0} totalCurrentBalance={0} />
      </div>
      <RightSidebar user={user} transactions={[]} banks={[]} />
    </section>
  );
}
