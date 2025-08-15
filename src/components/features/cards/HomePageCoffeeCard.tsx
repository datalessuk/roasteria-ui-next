import { ICoffeePublic } from "@/types/coffee";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CoffeeCardProps {
  coffee?: ICoffeePublic;
}

export default function HomePageCoffeeCard({ coffee }: CoffeeCardProps) {
  const router = useRouter();

  const openCoffee = (id: number): void => {
    if (!id) return;
    router.push(`/coffee/${id}`);
  };

  return (
    <div
      onClick={() => openCoffee(coffee?.id || 0)}
      className="relative w-80 h-96 cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
    >
      <div className="relative w-full h-full">
        <Image
          src={coffee?.image_url || "/placeholder.png"}
          alt={coffee?.name || "Coffee"}
          title={coffee?.name || "Coffee"}
          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl">
        <h2 className="text-white font-bold text-lg truncate">
          {coffee?.name}
        </h2>
        {coffee?.roast_level && (
          <p className="text-gray-300 text-sm mt-1 truncate">
            {coffee.roast_level}
          </p>
        )}
      </div>
    </div>
  );
}
