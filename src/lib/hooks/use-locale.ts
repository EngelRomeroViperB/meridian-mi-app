"use client";

import { useCallback } from "react";

import { dictionaries } from "@/lib/i18n/dictionaries";
import { createTranslator, type DictValue } from "@/lib/i18n/translator";
import { useAppStore } from "@/lib/store/app-store";
import type { Locale } from "@/lib/i18n/config";

export function useLocale() {
  const { locale, setLocale } = useAppStore();
  const dict = dictionaries[locale];

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) =>
      createTranslator(dict as unknown as Record<string, DictValue>)(key, params),
    [dict]
  );

  return { locale, setLocale: setLocale as (l: Locale) => void, t };
}
