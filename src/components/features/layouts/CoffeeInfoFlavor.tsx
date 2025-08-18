import { Badge } from "@/components/ui/badge";
import { ICoffee } from "@/types/coffee";

interface CoffeeProps {
  coffee: ICoffee | null;
}

export default function CoffeeInfoFlavor({ coffee }: CoffeeProps) {
  if (!coffee) {
    return;
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-colors">
      <div className="pt-2 pb-2">
        <h1>Flavor Profile</h1>
      </div>
      <div className="flex flex-row gap-3 capitalize">
        {coffee?.tasting_notes?.map((flavor) => (
          <Badge key={flavor} className="badge">
            {flavor}
          </Badge>
        ))}
      </div>
    </div>
  );
}
