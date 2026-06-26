import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect("/sign-in");
  return <div>{children}</div>;
}
