"use client";

import { Signal, signal } from "@preact/signals-react";

type SignalsStore = {
  authVerificationCodeSent: Signal<boolean>;
  passwordResetStep: Signal<
    "Request Reset" | "Verify Email" | "Reset Password"
  >;
};

export const signalsStore: SignalsStore = {
  authVerificationCodeSent: signal(false),
  passwordResetStep: signal("Request Reset"),
};
