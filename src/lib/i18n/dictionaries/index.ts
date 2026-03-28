import { es } from "./es";
import { en } from "./en";
import type { Locale } from "../config";

export const dictionaries: Record<Locale, typeof es> = { es, en };
