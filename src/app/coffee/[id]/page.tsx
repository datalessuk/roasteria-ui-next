"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCoffee } from "@/hooks/public/useCoffee";
import CoffeeInfoText from "@/components/features/layouts/CoffeeInfoText";
import { Button } from "@/components/ui/button";
import CoffeeInfoFlavor from "@/components/features/layouts/CoffeeInfoFlavor";
import CoffeeInfoAbout from "@/components/features/layouts/CoffeeInfoAbout";
import CoffeeStats from "@/components/features/coffee/CoffeeStats";

export default function CoffeeSingle() {
  const { id } = useParams<{ id: string }>();
  const { coffee, loading, error } = useCoffee(id);

  const parseOrigin = (type: boolean): string => {
    if (type) {
      return "Single";
    } else {
      return "Blend";
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container pt-4 mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        <div>
          <h1 className="text-4xl md:text-6xl mb-4">{coffee?.name}</h1>
          <figure className="dark:shadow-black/40 transform hover:scale-[1.02] transition-transform group shadow-xl">
            <Image
              src={coffee?.image_url ?? "/placeholder.png"}
              alt={coffee?.name ?? "Coffee image"}
              width={800}
              height={600}
              className="rounded-lg w-full object-cover"
            />
          </figure>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <CoffeeInfoText
              coffee={coffee?.processing_method}
              title="Process"
            />
            <CoffeeInfoText coffee={coffee?.roast_level} title="Roast" />
            <CoffeeInfoText
              coffee={parseOrigin(!!coffee?.single_origin)}
              title="Type"
            />
            <CoffeeInfoText coffee={coffee?.origin || "Blend"} title="Origin" />
          </div>
          <CoffeeInfoFlavor coffee={coffee} />
          <CoffeeInfoAbout coffee={coffee} />
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-colors">
            <h1>Product website</h1>
            <Button
              variant={"custom"}
              onClick={() => window.open(coffee?.url, "_blank")}
            >
              Coffee Link
            </Button>
          </div>
          <div>
            <CoffeeStats coffee={coffee} />
          </div>
        </div>
      </div>
    </div>
  );
}
