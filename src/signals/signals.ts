"use client";

import { Signal, signal } from "@preact/signals-react";

type SignalsStore = {
  authVerificationCodeSent: Signal<boolean>;
  selectedLogbook: Signal<string>;
};

export const signalsStore: SignalsStore = {
  authVerificationCodeSent: signal(false),
  selectedLogbook: signal(""),
};
