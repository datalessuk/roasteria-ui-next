import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { ICoffee } from "@/types/coffee";
import { Coffee, Heart, Pencil, Timer } from "lucide-react";
import { toast } from "sonner";

interface CoffeeStatsProps {
  coffee?: ICoffee | null;
}

export default function CoffeeStats({ coffee }: CoffeeStatsProps) {
  const { profile, addDrank, toTry, loading } = useUserStore();

  if (!profile) {
    return <></>;
  }

  if (!coffee) {
    return;
  }

  const hasDrank = profile?.drank?.includes(coffee?.id);
  const haveTried = profile?.to_try.includes(coffee?.id);

  const addCoffeeDrank = async (coffeeId: number) => {
    if (!profile) return;
    const added = await addDrank(coffeeId);
    if (added) {
      toast.success("Added To drink wishlist!", { position: "top-center" });
    } else {
      toast.warning("Sorry something went wrong!", { position: "top-center" });
    }
  };

  const addCoffeeToTry = async (coffeeId: number) => {
    if (!profile) return;
    const addToTry = await toTry(coffeeId);
    if (addToTry) {
      toast.success("Added Coffee to try !", { position: "top-center" });
    } else {
      toast.warning("Sorry something went wrong!", { position: "top-center" });
    }
  };

  return (
    <div className="flex justify-between items-center dark:bg-gray-800/50 p-8 rounded-2xl">
      <div className="flex space-x-4">
        <Button
          onClick={() => addCoffeeDrank(coffee?.id)}
          variant="outline"
          size="icon"
          disabled={hasDrank}
          className="flex flex-col items-center justify-center w-20 h-20 bg-gray-900 hover:bg-gray-800 border-gray-700 hover:border-gray-600 rounded-xl"
        >
          {hasDrank ? (
            <Coffee className="scale-125 text-yellow-400" />
          ) : (
            <Coffee className="scale-125 text-white" />
          )}
          <span className="text-sm font-medium text-white">
            {hasDrank ? "Drank" : "Drank"}
          </span>
        </Button>
        <Button
          onClick={() => addCoffeeToTry(coffee?.id)}
          variant="outline"
          disabled={haveTried}
          size="icon"
          className="flex flex-col items-center justify-center w-20 h-20 bg-gray-900 hover:bg-gray-800 border-gray-700 hover:border-gray-600 rounded-xl"
        >
          {haveTried ? (
            <Timer className="scale-125 text-yellow-400" />
          ) : (
            <Timer className="scale-125" />
          )}
          <span className="text-white text-sm font-medium">
            {haveTried ? "Tried" : "To Try"}
          </span>
        </Button>
        <Button
          disabled
          variant="outline"
          size="icon"
          className="flex flex-col items-center justify-center w-20 h-20 bg-gray-900 hover:bg-gray-800 border-gray-700 hover:border-gray-600 rounded-xl"
        >
          {}
          <Heart className="scale-125" />
          <span className="text-white text-sm font-medium">Favorite</span>
        </Button>
      </div>
      <Button
        disabled
        variant={"custom"}
        className="ml-4 flex items-center space-x-2"
      >
        <Pencil />
        <span>Write Review</span>
      </Button>
    </div>
  );
}
