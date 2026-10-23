"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Ano dinâmico do copyright, lido no cliente para não ficar fixo no momento do build. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span className="tabular-nums">{year}</span>;
}
