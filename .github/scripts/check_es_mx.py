#!/usr/bin/env python3
"""Validate the Mexican Spanish catalog without modifying repository files."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
LOCALES = ROOT / "frontend" / "src" / "lib" / "i18n" / "locales"


def load_catalog(name: str) -> dict[str, str]:
    with (LOCALES / name).open(encoding="utf-8") as handle:
        return json.load(handle)


def main() -> int:
    english = load_catalog("en.json")
    mexican = load_catalog("es-mx.json")

    missing = sorted(set(english) - set(mexican))
    extra = sorted(set(mexican) - set(english))
    pending = sorted(
        key
        for key, value in mexican.items()
        if "[NEEDS TRANSLATION]" in str(value)
    )

    if missing or extra or pending:
        print(
            "es-MX catalog invalid: "
            f"missing={len(missing)} extra={len(extra)} pending={len(pending)}"
        )
        return 1

    print(f"es-MX catalog complete: {len(mexican)} keys")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
