"use client";

import ProfileBadge from "@/components/features/layouts/ProfileBadge";
import Loading from "@/components/features/loading/Loading";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateUserName } from "@/hooks/profile/useUpdateUserName";

export default function Profile() {
  const { profile, loading, updateUsername } = useUserStore();
  const { updateUserName, userLoading, error } = useUpdateUserName();
  const [drank, setDrank] = useState<number>();
  const [toTry, setToTry] = useState<number>();
  const [reviewed, setReviewed] = useState<number>();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (profile?.drank) {
      setDrank(profile?.drank.length);
      setToTry(profile?.to_try.length);
      setReviewed(profile?.reviewed);
    }
  }, [profile]);

  if (loading) {
    return <Loading message="Loading profile " />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-lg">Error Loading Profile</div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!username) return;

    const updatedProfile = await updateUserName(username);
    if (updatedProfile) {
      updateUsername(updatedProfile.username);
      setUsername("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="bg-gradient-to-br from-[#2C1810] via-[#4A3628] to-[#5D4037] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {profile?.username ? (
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4">
                Welcome back {profile.username}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Track your tasting journey and discover your preferences
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 border border-gray-200 dark:border-gray-800 shadow-xl">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    Welcome to Your Profile
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Choose a username to get started
                  </p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="space-y-4"
                >
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 text-lg"
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-500 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={userLoading}
                    className="w-full h-12 text-lg font-semibold"
                  >
                    {userLoading ? "Creating Profile..." : "Create Profile"}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Your Stats
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Keep track of your progress and achievements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-200">
              <ProfileBadge count={toTry} text="To try" />
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-200">
              <ProfileBadge count={drank} text="Have Tried" />
            </div>
            <div className="group bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-8 border border-red-200 dark:border-red-800 hover:shadow-lg transition-all duration-200">
              <ProfileBadge count={reviewed} text="Coffees Reviewed" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
