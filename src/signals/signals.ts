"use client";

import { Signal, signal } from "@preact/signals-react";

type SignalsStore = {
  authVerificationCodeSent: Signal<boolean>;
  resetPassword: Signal<boolean>;
  selectedLogbookId: Signal<number | null>;
  totalSpent: Signal<string>;
  remaining: Signal<string>;
};

export const signalsStore: SignalsStore = {
  authVerificationCodeSent: signal(false),
  resetPassword: signal(false),
  selectedLogbookId: signal(null),
  totalSpent: signal(""),
  remaining: signal(""),
};
