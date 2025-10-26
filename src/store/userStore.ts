import { create } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { IProfile } from "@/types/profile";

interface UserState {
  profile: IProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  addDrank: (coffeeId: number) => Promise<boolean>;
  toTry: (coffeeId: number) => Promise<boolean>;
  clearProfile: () => void;
  updateUsername: (newUsername: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  loading: true,
  error: null,

  fetchProfile: async () => {
    const supabase = createClient();
    set({ loading: true, error: null });

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        set({ profile: null, loading: false });
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      set({ profile: data as IProfile, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  addDrank: async (coffeeId: number): Promise<boolean> => {
    const supabase = createClient();
    const profile = get().profile;

    if (!profile) return false;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          drank: [...(profile.drank || []), coffeeId],
        })
        .eq("id", profile.id)
        .select()
        .single();

      if (error) throw error;

      set({ profile: data as IProfile });
      return true;
    } catch (err) {
      console.error("Failed to add drank:", err);
      return false;
    }
  },

  toTry: async (coffeeId: number): Promise<boolean> => {
    const supabase = createClient();
    const profile = get().profile;

    if (!profile) return false;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          to_try: [...(profile.to_try || []), coffeeId],
        })
        .eq("id", profile.id)
        .select()
        .single();

      if (error) throw error;

      set({ profile: data as IProfile });
      return true;
    } catch (err) {
      console.error("Failed to add toTry:", err);
      return false;
    }
  },

  clearProfile: () => set({ profile: null, error: null, loading: false }),

  updateUsername: (newUsername: string) => {
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, username: newUsername }
        : state.profile,
    }));
  },
}));
