import { formatInvoiceDate, formatInvoiceMoney } from "./formatting.ts";

function assertEquals(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`Expected ${String(expected)}, received ${String(actual)}`);
  }
}

Deno.test("Mexican invoice date uses DD/MM/YYYY", () => {
  assertEquals(formatInvoiceDate("2026-01-15", "DD/MM/YYYY"), "15/01/2026");
});

Deno.test("Mexican invoice money uses MXN formatting", () => {
  assertEquals(
    formatInvoiceMoney(1234.56, "MXN", "comma", "es-mx"),
    "$1,234.56",
  );
});
