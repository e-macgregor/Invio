import { describe, expect, test } from "bun:test";
import enMessages from "../../src/lib/i18n/locales/en.json";
import esMxMessages from "../../src/lib/i18n/locales/es-mx.json";
import {
  createTranslator,
  listAvailableLocales,
  resolveLocalization,
} from "../../src/lib/i18n/mod";

describe("Mexican Spanish localization", () => {
  test("has complete, clean translation coverage", () => {
    expect(Object.keys(esMxMessages).sort()).toEqual(
      Object.keys(enMessages).sort(),
    );
    const values = Object.values(esMxMessages).join("\n");
    expect(values).not.toContain("[NEEDS TRANSLATION]");
    expect(values).not.toMatch(/\b(?:NIT|PSE|ICA|INC|ítem|Colombia)\b/i);
  });

  test("uses es-MX for unauthenticated and fresh sessions", () => {
    const translator = createTranslator();

    expect(translator.locale).toBe("es-mx");
    expect(translator.t("Login")).toBe("Iniciar sesión");
  });

  test("registers es-MX as an exact locale", () => {
    const translator = createTranslator("es-MX");

    expect(translator.locale).toBe("es-mx");
    expect(listAvailableLocales()).toContain("es-mx");
  });

  test("uses Mexican fiscal terminology", () => {
    const translator = createTranslator("es-MX");

    expect(translator.t("Tax ID")).toBe("RFC");
    expect(translator.t("Tax")).toBe("IVA");
    expect(translator.t("Currency")).toBe("Moneda");
  });

  test("keeps Mexican regional defaults", () => {
    const localization = resolveLocalization(
      "es-MX",
      "comma",
      "DD/MM/YYYY",
      "postal-city",
    );

    expect(localization.locale).toBe("es-mx");
    expect(localization.numberFormat).toBe("comma");
    expect(localization.dateFormat).toBe("DD/MM/YYYY");
    expect(localization.postalCityFormat).toBe("postal-city");
  });
});
