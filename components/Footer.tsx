import { logoutAccount } from "@/lib/actions/user.actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  const isMobile = type === "mobile";

  return (
    <footer className="flex items-center gap-3 border-t border-gray-200 p-4">
      {/* User Avatar */}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200">
        <p className="text-xl font-bold text-gray-700">
          {user?.name?.[0]?.toUpperCase()}
        </p>
      </div>

      {/* User Info */}
      <div className={`min-w-0 flex-1 ${isMobile ? "text-sm" : ""}`}>
        <h1 className="truncate text-sm font-semibold text-gray-700">
          {user?.name}
        </h1>

        <p className="truncate text-sm text-gray-500">{user?.email}</p>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogOut}
        className="shrink-0 rounded-md p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        aria-label="Log out">
        <LogOut className="size-5" />
      </button>
    </footer>
  );
};

export default Footer;
