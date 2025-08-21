"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeaturedCoffeeCard from "@/components/features/cards/FeaturedCoffeeCard";
import { Button } from "@/components/ui/button";
import { useGetCoffeesByRoaster } from "@/hooks/public/useGetCoffeesByRoaster";
import { useGetRoasters } from "@/hooks/public/useGetRoasters";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Coffees() {
  const router = useRouter();
  const { roasters } = useGetRoasters();

  useEffect(() => {
    if (roasters.length > 0 && !selectedRoaster) {
      const randomRoaster =
        roasters[Math.floor(Math.random() * roasters.length)];
      setSelectedRoaster(randomRoaster);
    }
  }, [roasters]);

  const [selectedRoaster, setSelectedRoaster] = useState<string | null>(null);
  const { coffeeByRoaster } = useGetCoffeesByRoaster(selectedRoaster || "");

  const openRoaster = () => {
    if (!selectedRoaster) {
      return;
    }
    router.push(`/roasters/${encodeURIComponent(selectedRoaster)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#2C1810] via-[#4A3628] to-[#5D4037] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-20 text-left">
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Coffee
          </h1>
          <h2 className="text-xl">Explore coffees from roasters</h2>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-2xl font-bold">Featured Roaster</h1>
          <Button className="cursor-pointer" onClick={() => openRoaster()}>
            View All <ChevronRightIcon />
          </Button>
        </div>
        <div className="pb-2 pt-2">
          <Select onValueChange={(value) => setSelectedRoaster(value)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Roasters" />
            </SelectTrigger>
            <SelectContent>
              {roasters.map((roaster, index) => (
                <SelectItem className="capitalize" key={index} value={roaster}>
                  {roaster}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="pt-2 pb-2">
          <p className="capitalize">{selectedRoaster}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {coffeeByRoaster.slice(0, 8).map((coffee) => (
            <FeaturedCoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </div>
    </div>
  );
}
