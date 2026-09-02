export function formatLocalizedDate(
  value: string | Date | undefined,
  format = "YYYY-MM-DD",
): string {
  if (!value) return "";

  let year: string;
  let month: string;
  let day: string;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    [year, month, day] = value.slice(0, 10).split("-");
  } else {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1).padStart(2, "0");
    day = String(date.getDate()).padStart(2, "0");
  }

  if (format === "DD/MM/YYYY") return `${day}/${month}/${year}`;
  if (format === "DD.MM.YYYY") return `${day}.${month}.${year}`;
  return `${year}-${month}-${day}`;
}

export function formatLocalizedMoney(
  value: number | undefined,
  currency = "MXN",
  locale = "es-MX",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}
