export function formatCurrency(amount: number, locale = "es-CO", currency = "COP"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-CO").format(n);
}
