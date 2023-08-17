import { Signal, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { Agreement } from "./agreement";
import { AuthHeader } from "./header";
import { AuthInputs } from "./inputs";

type Props = {
  disabled: Signal<boolean>;
};

export const RegistrationForm = (props: Props) => {
  const { authStep } = signalsStore;

  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const agreementChecked = useSignal(false);

  function register(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!props.disabled.value) {
      authStep.value = "Verification";

      // dispatch(
      //   Sagas.registerRequest({
      //     email: email.value,
      //     username: username.value,
      //     password: password.value,
      //   })
      // );

      console.log("Email:", email.value);
      console.log("Username:", username.value);
      console.log("Password:", password.value);
      console.log("Confirm Password:", confirmPassword.value);
    }
  }

  return (
    <form onSubmit={register}>
      <AuthHeader pageType="Registration" title="Registration" />

      <AuthInputs
        pageType="Registration"
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        agreementChecked={agreementChecked}
        disabled={props.disabled}
      />

      <Agreement checked={agreementChecked} pageType="Registration" />

      <Components.Button
        text="Create Account"
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        disabled={props.disabled.value}
        submit
        centered
        primary
      />
    </form>
  );
};
