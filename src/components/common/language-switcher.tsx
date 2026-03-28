"use client";

import { useLocale } from "@/lib/hooks/use-locale";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  function toggle() {
    setLocale(locale === "es" ? "en" : "es");
  }

  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
      aria-label="Cambiar idioma"
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
