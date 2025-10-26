"use client";
import { useGetRoaster } from "@/hooks/public/useGetRoaster";
import { useParams } from "next/navigation";
import Image from "next/image";
import RoasterInfoAbout from "@/components/features/layouts/RoasterInfoAbout";
import { useGetCoffeesByRoaster } from "@/hooks/public/useGetCoffeesByRoaster";
import FeaturedCoffeeCard from "@/components/features/cards/FeaturedCoffeeCard";
import Loading from "@/components/features/loading/Loading";
import { MapPin, ExternalLink } from "lucide-react";

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
        <div className="text-center">
          <div className="text-6xl mb-4">☕</div>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Roaster Not Found
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Sorry, we could not find that roaster.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#2C1810] via-[#4A3628] to-[#5D4037] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={roaster?.image ?? "/placeholder.png"}
                  alt={roaster?.name ?? "Coffee roaster"}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 text-white">
              <div>
                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-4 border border-white/20">
                  <span className="text-sm font-medium">Coffee Roaster</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold capitalize mb-4">
                  {roaster?.name}
                </h1>
              </div>

              {roaster?.location && (
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-white/80">{roaster.location}</p>
                  </div>
                </div>
              )}

              {roaster?.url && (
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <ExternalLink className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Website</h3>
                    <a
                      href={roaster.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 transition-colors underline underline-offset-2"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {roaster?.about && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              About {roaster?.name}
            </h2>
            <RoasterInfoAbout about={roaster.about} />
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Coffee Releases
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {coffeeByRoaster.length}{" "}
            {coffeeByRoaster.length === 1 ? "coffee" : "coffees"} available
          </p>
        </div>

        {coffeeByRoaster.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coffeeByRoaster.map((coffee) => (
              <FeaturedCoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-16 text-center">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No Coffees Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This roaster have not added any coffees to our platform yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
