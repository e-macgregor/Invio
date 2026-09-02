import { describe, expect, test } from "bun:test";
import {
  formatLocalizedDate,
  formatLocalizedMoney,
} from "../src/lib/formatting";

describe("Mexican formatting", () => {
  test("formats dates without a timezone shift", () => {
    expect(formatLocalizedDate("2026-01-15", "DD/MM/YYYY")).toBe("15/01/2026");
  });

  test("formats MXN with Mexican separators", () => {
    expect(formatLocalizedMoney(1234.56, "MXN", "es-MX")).toBe("$1,234.56");
  });
});
