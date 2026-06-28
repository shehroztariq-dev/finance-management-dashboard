import HeaderBox from "@/components/header-box";
import RightSidebar from "@/components/right-sidebar";
import TotalBalanceBox from "@/components/total-balance-box";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function Home() {
  const user = await getLoggedInUser();

  return (
    <section className="no-scrollbar flex w-full gap-8  xl:max-h-screen xl:overflow-y-scroll">
      <div className="flex-1 min-w-0 p-10">
        <HeaderBox
          type="greeting"
          title="Welcome"
          subtext="Access and manage your account and transactions effectively"
          user={user?.name}
        />
        <TotalBalanceBox accounts={[]} totalBanks={0} totalCurrentBalance={0} />
      </div>
      <RightSidebar user={user} transactions={[]} banks={[]} />
    </section>
  );
}
