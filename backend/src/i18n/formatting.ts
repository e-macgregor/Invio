export function formatInvoiceDate(
  value?: string | Date,
  format = "YYYY-MM-DD",
): string | undefined {
  if (!value) return undefined;

  let year: string;
  let month: string;
  let day: string;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    [year, month, day] = value.slice(0, 10).split("-");
  } else {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return undefined;
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1).padStart(2, "0");
    day = String(date.getDate()).padStart(2, "0");
  }

  if (format === "DD/MM/YYYY") return `${day}/${month}/${year}`;
  if (format === "DD.MM.YYYY") return `${day}.${month}.${year}`;
  return `${year}-${month}-${day}`;
}

export function formatInvoiceMoney(
  value: number,
  currency: string,
  numberFormat: "comma" | "period" = "comma",
  locale = "en",
): string {
  const normalizedLocale = locale.toLowerCase();
  const intlLocale =
    normalizedLocale === "es-mx" || currency.toUpperCase() === "MXN"
      ? "es-MX"
      : numberFormat === "period"
      ? "de-DE"
      : "en-US";

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(value);
}
