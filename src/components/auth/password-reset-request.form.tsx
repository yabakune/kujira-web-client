import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { AuthHeader } from "./header";
import { AuthInput } from "./auth-input";

type Props = {
  email: Signal<string>;
  emailError: Signal<string>;
};

export const PasswordResetRequestForm = (props: Props) => {
  const { authStep } = signalsStore;

  const disabled = useSignal(true);

  effect(() => {
    disabled.value = props.email.value === "" || props.emailError.value != "";
  });

  function handleSubmit(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!disabled.value) {
      console.log("Password Reset Request");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AuthHeader pageStep={authStep.value} />

      <AuthInput
        key="Auth Email Input"
        type="email"
        placeholder="Email"
        userInput={props.email}
        errorMessage={props.emailError.value}
      />

      <Components.Button
        text={
          authStep.value === "Password Reset Request"
            ? "Request Reset"
            : "Reset Password"
        }
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        disabled={disabled.value}
        submit
        centered
        primary
      />
    </form>
  );
};
