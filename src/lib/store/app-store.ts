import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Locale } from "@/lib/i18n/config";

interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      locale: "es",
      setLocale: (locale) => set({ locale })
    }),
    { name: "meridian-app" }
  )
);
