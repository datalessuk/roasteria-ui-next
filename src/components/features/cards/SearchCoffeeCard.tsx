import { ICoffee } from "@/types/coffee";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CoffeeCardProps {
  coffee?: ICoffee;
}

export default function SearchCoffeeCard({ coffee }: CoffeeCardProps) {
  if (!coffee) return null;

  return (
    <div className="block w-full cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
      <figure className="flex justify-center p-4">
        <Image
          className="object-cover rounded-lg mx-auto w-[240px] h-[191px]"
          src={coffee.image_url}
          alt={`Image of ${coffee.name}`}
          width={240}
          height={191}
        />
      </figure>

      <div className="pt-2">
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 capitalize">
          {coffee.name}
        </h1>

        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize">
          {coffee.processing_method}
        </h2>

        <div className="pt-2">
          <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100 opacity-50 capitalize">
            {coffee?.tasting_notes?.join(", ")}
          </h2>
        </div>

        <div className="pt-2 capitalize">
          <Badge variant="roast">{coffee.roast_level}</Badge>
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-medium"></div>
      </div>
    </div>
  );
}
