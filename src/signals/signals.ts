"use client";

import { Signal, signal } from "@preact/signals-react";

import * as Types from "@/types";

type SignalsStore = {
  authVerificationCodeSent: Signal<boolean>;
  authStep: Signal<Types.AuthStep>;
  passwordResetStep: Signal<
    "Request Reset" | "Verify Email" | "Reset Password"
  >;
};

export const signalsStore: SignalsStore = {
  authVerificationCodeSent: signal(false),
  authStep: signal(""),
  passwordResetStep: signal("Request Reset"),
};
