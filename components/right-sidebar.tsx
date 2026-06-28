import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import BankCard from "./bank-card";

export default function RightSidebar({
  user,
  transactions,
  banks,
}: RightSidebarProps) {
  return (
    <aside className="no-scrollbar hidden xl:flex flex-col h-screen max-h-screen fixed right-0 w-88.75 border-l border-gray-200 overflow-y-scroll">
      <section className="flex flex-col pb-8">
        <div
          className="h-30 w-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `
              radial-gradient(at 0% 0%, #6ee7b7 0px, transparent 50%),
              radial-gradient(at 80% 0%, #34d399 0px, transparent 50%),
              radial-gradient(at 0% 100%, #059669 0px, transparent 50%),
              radial-gradient(at 80% 100%, #10b981 0px, transparent 50%),
              radial-gradient(at 50% 50%, #a7f3d0 0px, transparent 60%)
            `,
          }}
        />
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex items-center justify-center absolute -top-8 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile">
            <span className="text-5xl font-bold text-gray-400">
              {user?.name[0]}
            </span>
          </div>
          <div className="flex flex-col pt-24">
            <h1 className="text-24 font-semibold text-gray-900">
              {user?.name}
            </h1>
            <p className=" text-16 font-normal text-gray-600">{user?.email}</p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-between gap-2 px-6 py-2">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-18 font-semibold text-gray-900">My Banks</h2>
          <Button variant={"link"} className="cursor-pointer">
            <Plus />
            Add Bank
          </Button>
        </div>
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 ">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
}
