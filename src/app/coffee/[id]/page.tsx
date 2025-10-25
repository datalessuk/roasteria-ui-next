"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCoffee } from "@/hooks/public/useCoffee";
import CoffeeInfoText from "@/components/features/layouts/CoffeeInfoText";
import { Button } from "@/components/ui/button";
import CoffeeInfoFlavor from "@/components/features/layouts/CoffeeInfoFlavor";
import CoffeeInfoAbout from "@/components/features/layouts/CoffeeInfoAbout";
import CoffeeStats from "@/components/features/coffee/CoffeeStats";
import Loading from "@/components/features/loading/Loading";

export default function CoffeeSingle() {
  const { id } = useParams<{ id: string }>();
  const { coffee, loading, error } = useCoffee(id);
  const router = useRouter();

  if (!coffee) {
    return (
      <div className="flex justify-center pt-4">
        <p>Sorry coffee not found.</p>
      </div>
    );
  }

  const parseOrigin = (type: boolean): string => {
    if (type) {
      return "Single";
    } else {
      return "Blend";
    }
  };

  if (loading) return <Loading message="Loading tasty coffee" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container pt-4 mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="inline-block px-3 py-1 bg-amber-900/20 rounded-full mb-3">
          <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            {coffee?.roaster}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold capitalize leading-tight">
          {coffee?.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl dark:shadow-black/40 transform hover:scale-[1.02] transition-transform duration-300 group">
            <Image
              src={coffee?.image_url ?? "/placeholder.png"}
              alt={coffee?.name ?? "Coffee image"}
              width={800}
              height={600}
              className="rounded-2xl w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CoffeeInfoText
              coffee={coffee?.processing_method}
              title="Process"
            />
            <CoffeeInfoText coffee={coffee?.roast_level} title="Roast" />
            <CoffeeInfoText
              coffee={parseOrigin(!!coffee?.single_origin)}
              title="Type"
            />
            <CoffeeInfoText coffee={coffee?.roaster} title="Roaster" />
          </div>

          <CoffeeInfoFlavor coffee={coffee} />
          <CoffeeInfoAbout coffee={coffee} />

          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-colors">
            <h2 className="text-lg font-semibold mb-3">Product Website</h2>
            <Button
              variant={"custom"}
              className="w-full sm:w-auto"
              onClick={() => window.open(coffee?.url, "_blank")}
            >
              View Coffee Link
            </Button>
          </div>

          <CoffeeStats coffee={coffee} />
        </div>
      </div>
    </div>
  );
}
