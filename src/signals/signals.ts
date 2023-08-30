"use client";

import { Signal, signal } from "@preact/signals-react";

import * as Types from "@/types";

type SignalsStore = {
  authStep: Signal<Types.AuthPageStep>;
  currentLogbookId: Signal<number | null>;
};

export const signalsStore: SignalsStore = {
  authStep: signal(""),
  currentLogbookId: signal(null),
};
