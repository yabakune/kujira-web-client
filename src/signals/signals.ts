"use client";

import { Signal, signal } from "@preact/signals-react";

import * as Types from "@/types";

type SignalsStore = {
  authStep: Signal<Types.AuthPageStep>;

  currentLogbookId: Signal<number | null>;
  currentSettingsPage: Signal<Types.SettingsPage>;
  remainingBudget: Signal<number | null>;

  confirmationModalOpen: Signal<boolean>;
};

export const signalsStore: SignalsStore = {
  authStep: signal(""),

  currentLogbookId: signal(null),
  currentSettingsPage: signal("Personal"),
  remainingBudget: signal(null),

  confirmationModalOpen: signal(false),
};
