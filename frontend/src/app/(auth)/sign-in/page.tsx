import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Sign in" };

// Placeholder: accepts any email and password. Replace with Supabase auth.
async function signIn() {
  "use server";
  redirect("/dashboard");
}

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-6 md:p-8">
        <h1 className="text-section-title text-neutral-950">Sign in</h1>
        <p className="mt-1 mb-6 text-body text-muted-foreground">Welcome back to Infravanta Home.</p>
        <form action={signIn} className="flex flex-col gap-4">
          <Input label="Email address" type="email" name="email" autoComplete="email" required />
          <Input label="Password" type="password" name="password" autoComplete="current-password" required />
          <Button type="submit" className="mt-2 w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-6 text-center text-body text-muted-foreground">
          New to Infravanta Home?{" "}
          <Link href="/sign-up" className="font-semibold text-brand-700 hover:underline">
            Create an account
          </Link>
        </p>
      </Card>
    </main>
  );
}
