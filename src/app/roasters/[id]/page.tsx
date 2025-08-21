"use client";
import { useGetRoaster } from "@/hooks/public/useGetRoaster";
import { useParams } from "next/navigation";
import Image from "next/image";
import RoasterInfoAbout from "@/components/features/layouts/RoasterInfoAbout";
import { useGetCoffeesByRoaster } from "@/hooks/public/useGetCoffeesByRoaster";
import FeaturedCoffeeCard from "@/components/features/cards/FeaturedCoffeeCard";
import Loading from "@/components/features/loading/Loading";

export default function Roasters() {
  const { id } = useParams<{ id: string }>();
  const roasterId = decodeURIComponent(id as string);
  const { roaster, loading } = useGetRoaster(roasterId);
  const { coffeeByRoaster, loading: coffeeLoading } = useGetCoffeesByRoaster(
    roasterId || ""
  );

  if (loading || coffeeLoading) {
    return <Loading message="Loading Roaster" />;
  }

  if (!roaster && !coffeeLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">
          Sorry, we couldn’t find that roaster.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="relative">
          <figure className="dark:shadow-black/40 transform hover:scale-[1.02] transition-transform duration-300 shadow-xl rounded-lg overflow-hidden">
            <Image
              src={roaster?.image ?? "/placeholder.png"}
              alt={roaster?.name ?? "Coffee roaster"}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </figure>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold capitalize tracking-tight">
              {roaster?.name}
            </h1>
          </div>
          <div className="space-y-6">
            <div>
              <h1>About</h1>
              {roaster?.about && <RoasterInfoAbout about={roaster?.about} />}
            </div>
          </div>

          {roaster?.location && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold opacity-75">Location</h2>
              <p className="text-base">{roaster.location}</p>
            </div>
          )}

          {roaster?.url && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold opacity-75">Website</h2>
              <a
                href={roaster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base  text-green-800 hover:opacity-75 transition-opacity underline decoration-1 underline-offset-2"
              >
                {roaster?.url}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="pt-4">
        <div>
          <h1 className="text-2xl font-semibold mb-4">All Coffee Releases</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {coffeeByRoaster.map((coffee) => (
            <div key={coffee.id} className="w-full max-w-xs mx-auto">
              <FeaturedCoffeeCard coffee={coffee} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
