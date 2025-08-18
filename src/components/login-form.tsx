"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
//import { createClient } from "@/lib/superbase/client";
import { createClient } from "@/utils/supabase/client";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // This will redirect users to your dashboard after they click the email link
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setMagicLinkSent(true);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${window.location.origin}/dashboard/generate`,
  //       },
  //     });

  //     if (error) {
  //       console.error("Google sign-in error:", error);
  //       alert(error.message);
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //     alert("An unexpected error occurred");
  //   }
  // };

  if (magicLinkSent) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              Sent a magic link to {email}. Click the link in the email to sign
              in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                className="w-full"
                variant={"custom"}
                onClick={() => setMagicLinkSent(false)}
              >
                Back to login
              </Button>
              {/* <Button
                type="button"
                className="w-full"
                onClick={handleGoogleSignIn}
              >
                Or continue with Google
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email to receive a magic link or sign in with Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMagicLinkSignIn}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  variant={"custom"}
                  disabled={loading}
                >
                  {loading ? "Sending magic link..." : "Send magic link"}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  {/* <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div> */}
                </div>
                {/* <Button
                  type="button"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </Button> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
