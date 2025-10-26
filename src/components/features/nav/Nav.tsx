"use client";

import React, { useEffect, useState } from "react";
import { Menu, Coffee, Rocket, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { createClient } from "@/utils/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { SearchBar } from "./SearchBar";

export default function NavBar() {
  const { profile, clearProfile } = useUserStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                    href="/coffees"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Explore
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/search"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Advance Search
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    Brewing Ratios
                  </NavigationMenuLink>
                </NavigationMenuItem> */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            {profile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@username" />
                      <AvatarFallback className="bg-amber-500 text-slate-900 font-semibold ">
                        {profile?.username
                          ? profile.username.charAt(0).toUpperCase()
                          : "A"}
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

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2 text-gray-300 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetTitle className="text-white text-lg font-semibold px-4 mt-4 hidden">
                Menu
              </SheetTitle>
              <SheetContent
                side="right"
                className="bg-slate-900 border-l border-slate-700 flex flex-col px-4 pt-14 pb-6"
              >
                <SheetTitle className="text-white text-lg font-semibold mb-6 hidden">
                  Menu
                </SheetTitle>

                <div className="mb-6">
                  <SearchBar closeSheet={() => setSheetOpen(false)} />
                </div>

                <nav className="flex flex-col gap-3">
                  <Link
                    href="/search"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800/90 transition-colors"
                  >
                    <Coffee className="w-5 h-5 text-amber-400" />
                    <span className="text-slate-100">Explore</span>
                  </Link>
                  {/* <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800/90 transition-colors"
                  >
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-100">Brewing Ratio</span>
                  </Link> */}
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800/90 transition-colors"
                  >
                    <Rocket className="w-5 h-5 text-sky-400" />
                    <span className="text-slate-100">Flavour Space</span>
                  </Link>
                </nav>
                <div className="mt-auto pt-6">
                  {profile ? (
                    <Button
                      onClick={signOut}
                      variant="custom"
                      size="icon"
                      className="w-full"
                    >
                      <LogOut /> Sign Out
                    </Button>
                  ) : (
                    <Button variant="custom" className="w-full">
                      Sign in
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
