"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BrandLogo from "./brand-logo";
import CustomInput from "./custom-input";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PlaidLink from "../PlaidLink";

type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

// AuthForm.tsx
export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address1: "",
      city: "",
      postalCode: "",
      state: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const newUser = await signUp(data as SignUpParams);
        setUser(newUser);
        toast.success("Account created! Please link your bank account.");
        return;
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (!response) {
          toast.error("Invalid email or password.");
          return;
        }
        toast.success("Signed in successfully");
        router.refresh();
        router.push("/");
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <header className="flex flex-col gap-2">
          <BrandLogo />
          <div>
            <h1 className="text-lg font-bold">
              {user
                ? "Link Account"
                : type === "sign-in"
                  ? "Sign In"
                  : "Sign Up"}
            </h1>
            <p className="text-[14px] font-normal text-gray-600">
              {user ? "Link Account" : "Please enter your details"}
            </p>
          </div>
        </header>
        {user ? (
          <div className="flex flex-col gap-2">
            <PlaidLink user={user} variant="primary" />
          </div>
        ) : (
          <>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FieldGroup>
                {type === "sign-up" && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <CustomInput
                        control={form.control}
                        label="First Name"
                        name="firstName"
                        placeholder="ex:John"
                      />
                      <CustomInput
                        control={form.control}
                        label="Last Name"
                        name="lastName"
                        placeholder="ex:Doe"
                      />
                    </div>
                    <CustomInput
                      control={form.control}
                      label="Address"
                      name="address1"
                      placeholder="Enter your specific Address"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <CustomInput
                        control={form.control}
                        label="City"
                        name="city"
                        placeholder="ex:New York"
                      />
                      <CustomInput
                        control={form.control}
                        label="State"
                        name="state"
                        placeholder="ex:NY"
                      />
                    </div>
                    <CustomInput
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="ex:11101"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <CustomInput
                        control={form.control}
                        label="Date of Birth"
                        name="dateOfBirth"
                        placeholder="YYYY-MM-DD"
                      />
                      <CustomInput
                        control={form.control}
                        label="SSN"
                        name="ssn"
                        placeholder="ex:123456789"
                      />
                    </div>
                  </>
                )}
                {/* Email Input */}
                <CustomInput
                  control={form.control}
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                />
                {/* Password Input */}
                <CustomInput
                  control={form.control}
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" />
                      Loading...
                    </span>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </FieldGroup>
            </form>
          </>
        )}
        {!user && (
          <footer className="flex items-center justify-center gap-1">
            <p className="text-sm text-gray-600 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-sm font-normal hover:underline">
              {type === "sign-in" ? "Create Account" : "Sign In"}
            </Link>
          </footer>
        )}
      </div>
    </div>
  );
}
