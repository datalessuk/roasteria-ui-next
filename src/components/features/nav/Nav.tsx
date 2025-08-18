"use client";

import React, { useEffect, useState } from "react";
import { Search, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/userStore";

export default function NavBar() {
  const { profile, clearProfile } = useUserStore();

  const supabase = createClient();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      clearProfile();
      router.push("/login");
    }
  };

  const FormSchema = z.object({
    search: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        search: "",
      },
    });
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const query = new URLSearchParams();
    if (data.search) {
      query.set("name", data.search);
    }
    const searchUrl = `/search?${query.toString()}`;
    router.push(searchUrl);
  }

  return (
    <div className="dark:bg-gray-950/80 backdrop-blur-md">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div>
              <Link href="/">
                <h1 className="text-2xl font-bold">Roasteria</h1>
              </Link>
            </div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="space-x-6">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/search"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Explore
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
                    Brewing Ratio
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Flavor Space
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative w-full"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <FormField
                  control={form.control}
                  name="search" // match your zod schema
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Search coffees..."
                          className="w-full bg-white/80 backdrop-blur-sm border-white/20 rounded-full py-2.5 pl-10 pr-4 placeholder-gray-400 focus:ring-amber-500/50 focus:border-amber-500/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className="flex items-center space-x-4">
            {/* {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
              >
                <Sun className="h-5 w-5" />
              </Button>
            )} */}
            {profile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@username" />
                      <AvatarFallback className="bg-amber-500 text-slate-900 font-semibold">
                        D
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-slate-800 border-slate-700"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                  >
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray-300 hover:text-white hover:bg-slate-700"
                    onClick={signOut}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!profile && (
              <div>
                <Button
                  onClick={() => router.push("/login")}
                  variant={"custom"}
                >
                  Login
                </Button>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2 text-gray-300 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-900 border-slate-700"
              >
                <div className="flex flex-col space-y-4 mt-6">
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-300 hover:text-white hover:bg-slate-800"
                  >
                    Explore
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-300 hover:text-white hover:bg-slate-800"
                  >
                    Advanced Search
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-300 hover:text-white hover:bg-slate-800"
                  >
                    Flavor Space
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
