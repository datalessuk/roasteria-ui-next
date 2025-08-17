"use client";
import { useRouter } from "next/navigation";
import HomePageCoffeeCard from "@/components/features/cards/HomePageCoffeeCard";
import { Button } from "@/components/ui/button";
import { useApprovedCoffees } from "@/hooks/public/useApprovedCoffees";
import HomePageHero from "@/components/features/cards/HomePageHero";

export default function DashBoard() {
  const { coffees, loading, error } = useApprovedCoffees();
  const router = useRouter();

  const openSearch = () => {
    router.push(`/search`);
  };

  return (
    <div>
      <section className="w-full px-4 text-center mx-auto p-30 bg-gradient-to-b from-[#2C1810] to-[#4A3628] dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-[var(--dark-heading-text)]">
            Build your personal coffee vault.
          </h1>
          <p className="text-lg">
            Track what you love, uncover new roasters, and make every cup
            memorable.
          </p>
          <div className="pt-6">
            <Button
              onClick={() => openSearch()}
              className="p-5"
              variant={"custom"}
            >
              Discover
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto py-2 pb-10 pt-8">
          <div className="flex justify-center py-4">
            <h1 className="text-4xl">Featured Coffees</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {coffees.map((coffee) => (
              <HomePageCoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto py-2 p-30 bg-gradient-to-b from-[#2C1810] to-[#4A3628] dark:from-gray-900 dark:to-gray-800 pb-10">
          <div className="text-center py-4">
            <h1 className="text-5xl">Find Your Flavor</h1>
            <h2>Explore our range and uncover your ideal cup!</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <HomePageHero
              title="Single Origin Coffees"
              text="Explore Single Origin"
              url="origin=true"
            />
            <HomePageHero
              title="Light roasts"
              text="Explore Light Roasts"
              url="roast=light"
            />
            <HomePageHero
              title="Natural Coffees"
              text="Explore Natural Processed"
              url="proccessing=natural"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
