import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Create an account" };

// Placeholder: accepts any details. Replace with Supabase auth.
async function signUp() {
  "use server";
  redirect("/onboarding");
}

export default function SignUpPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-6 md:p-8">
        <h1 className="text-section-title text-neutral-950">Create your account</h1>
        <p className="mt-1 mb-6 text-body text-muted-foreground">Free to start. No payment details needed.</p>
        <form action={signUp} className="flex flex-col gap-4">
          <Input label="First name" name="firstName" autoComplete="given-name" required />
          <Input label="Email address" type="email" name="email" autoComplete="email" required />
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            helperText="At least 8 characters."
            required
          />
          <Button type="submit" className="mt-2 w-full">
            Create account
          </Button>
        </form>
        <p className="mt-6 text-center text-body text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-brand-700 hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
