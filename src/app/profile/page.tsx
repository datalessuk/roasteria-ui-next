"use client";

import ProfileBadge from "@/components/features/layouts/ProfileBadge";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function Profile() {
  const { profile, loading } = useUserStore();
  const [drank, setDrank] = useState<number>();
  const [toTry, setToTry] = useState<number>();

  useEffect(() => {
    if (profile?.drank) {
      setDrank(profile.drank.length);
      setToTry(profile.to_try.length);
    }
  }, [profile]);

  if (!profile) {
    return <div>Error Loading Profile</div>;
  }
  return (
    <div>
      <section className="w-full px-4 text-center mx-auto p-10  bg-gradient-to-b from-[#2C1810] to-[#4A3628] dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-[var(--dark-heading-text)]">
            Profile
          </h1>
        </div>
      </section>
      <section className="p-5">
        <div className="pt-4 pb-4">
          <h1 className="text-xl">Your Stats</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card dark:bg-gray-900 rounded-xl p-6 shadow-md dark:shadow-black/20 border border-border">
            <ProfileBadge count={toTry} text="To try" />
          </div>
          <div className="bg-card dark:bg-gray-900 rounded-xl p-6 shadow-md dark:shadow-black/20 border border-border">
            <ProfileBadge count={drank} text="Have Tried" />
          </div>
          <div className="bg-card dark:bg-gray-900 rounded-xl p-6 shadow-md dark:shadow-black/20 border border-border">
            <ProfileBadge count={0} text="Favorites" />
          </div>
        </div>
      </section>
    </div>
  );
}
