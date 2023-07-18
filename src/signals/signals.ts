"use client";

import { Signal, signal } from "@preact/signals-react";

type SignalsStore = {
  authVerificationCodeSent: Signal<boolean>;
  selectedLogbookId: Signal<number | null>;
};

export const signalsStore: SignalsStore = {
  authVerificationCodeSent: signal(false),
  selectedLogbookId: signal(null),
};
