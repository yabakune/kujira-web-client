"use client";

import { Signal, signal } from "@preact/signals-react";

import * as Types from "@/types";

type SignalsStore = {
  authStep: Signal<Types.AuthPageStep>;
  passwordResetStep: Signal<
    "Request Reset" | "Verify Email" | "Reset Password"
  >;
};

export const signalsStore: SignalsStore = {
  authStep: signal(""),
  passwordResetStep: signal("Request Reset"),
};
