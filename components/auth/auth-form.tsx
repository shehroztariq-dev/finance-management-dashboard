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
import { signUp } from "@/lib/actions/user.actions";

type AuthFormProps = {
  type: "sign-in" | "sign-up";
};

// AuthForm.tsx
export default function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

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
      }
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center mx-10">
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <header className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">{/* PLAID LINK */}</div>
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
                        label="State"
                        name="state"
                        placeholder="ex:NY"
                      />
                      <CustomInput
                        control={form.control}
                        label="Postal Code"
                        name="postalCode"
                        placeholder="ex:11101"
                      />
                    </div>
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
                        placeholder="ex:1234"
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
