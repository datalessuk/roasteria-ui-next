import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center pb-4">
          <h1 className="text-3xl">Welcome back</h1>
          <p className="text-xl">Sign in to your account to continue</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
