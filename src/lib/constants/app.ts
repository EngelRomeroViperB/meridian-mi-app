export const APP_NAME = "Meridian";
export const APP_DEFAULT_LOCALE = "es";
export const APP_FALLBACK_LOCALE = "en";
export const APP_TIMEZONE = "America/Bogota";

export const APP_ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  focus: "/focus",
  money: "/money",
  moneyProjects: "/money/projects",
  streak: "/streak",
  offline: "/~offline"
} as const;
