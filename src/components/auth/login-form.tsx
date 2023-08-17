import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { AuthHeader } from "./header";
import { AuthInputs } from "./inputs";

export const LoginForm = () => {
  const { authStep } = signalsStore;

  const email = useSignal("");
  const password = useSignal("");
  const disabled = useSignal(true);

  function login(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!disabled.value) {
      authStep.value = "Verification";

      console.log("Email:", email.value);
      console.log("Password:", password.value);
    }
  }

  return (
    <form onSubmit={login}>
      <AuthHeader pageType="Login" title="Login" />

      <AuthInputs
        pageType="Login"
        email={email}
        password={password}
        disabled={disabled}
      />

      <Components.Button
        text="Log In"
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        disabled={disabled.value}
        submit
        centered
        primary
      />
    </form>
  );
};
