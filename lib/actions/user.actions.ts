"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return parseStringify(session);
  } catch (error) {
    console.error("Sign in error:", error);
    return null;
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;

  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const sessionClient = await createSessionClient();

    if (!sessionClient) {
      return null;
    }

    const user = await sessionClient.account.get();

    return parseStringify(user);
  } catch (error) {
    console.error("getLoggedInUser error:", error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const sessionClient = await createSessionClient();

    if (sessionClient) {
      await sessionClient.account.deleteSession("current");
    }

    (await cookies()).delete("appwrite-session");

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};
