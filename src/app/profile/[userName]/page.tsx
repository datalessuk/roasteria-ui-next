"use client";

import { usePublicProfile } from "@/hooks/public/usePublicProfile";
import { use } from "react";
import Loading from "@/components/features/loading/Loading";
import HomePageCoffeeCard from "@/components/features/cards/HomePageCoffeeCard";
import { useApprovedCoffees } from "@/hooks/public/useApprovedCoffees";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PublicProfile({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = use(params);
  const { profile, loading } = usePublicProfile(userName);
  const { coffees } = useApprovedCoffees();

  if (loading) {
    return <Loading message="Loading public profile" />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-lg">User not found</div>
      </div>
    );
  }

  const triedCoffees = coffees.filter((coffee) =>
    profile.drank?.includes(coffee.id)
  );
  const toTryCoffees = coffees.filter((coffee) =>
    profile.to_try?.includes(coffee.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#2C1810] via-[#4A3628] to-[#5D4037] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">@{userName}</h1>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Coffee Stats
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Their coffee journey and achievements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {profile.to_try?.length || 0}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Want to Try
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-200">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {profile.drank?.length || 0}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Have Tried
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-8 border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-200">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {profile.reviewed || 0}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Coffees Reviewed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-10">
          <Tabs defaultValue="tried" className="w-full">
            <TabsList className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8 bg-transparent">
              <TabsTrigger
                value="tried"
                className="text-lg font-semibold data-[state=active]:text-[#4A3628] dark:data-[state=active]:text-amber-400"
              >
                Tried Coffees ({triedCoffees.length})
              </TabsTrigger>
              <TabsTrigger
                value="toTry"
                className="text-lg font-semibold data-[state=active]:text-[#4A3628] dark:data-[state=active]:text-amber-400"
              >
                Want to Try ({toTryCoffees.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tried">
              {triedCoffees.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-start">
                  {triedCoffees.map((coffee) => (
                    <HomePageCoffeeCard key={coffee.id} coffee={coffee} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">☕</div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    No coffees yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This user has not tried any coffees yet
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="toTry">
              {toTryCoffees.length > 0 ? (
                <div className="flex flex-wrap gap-6 justify-start">
                  {toTryCoffees.map((coffee) => (
                    <HomePageCoffeeCard key={coffee.id} coffee={coffee} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">☕</div>
                  <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    No coffees yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This user has not added any coffees to their wishlist
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
