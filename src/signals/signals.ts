"use client";

import { Signal, signal } from "@preact/signals-react";

type SignalsStore = {
  authVerificationCodeSent: Signal<boolean>;
};

export const signalsStore: SignalsStore = {
  authVerificationCodeSent: signal(false),
};
