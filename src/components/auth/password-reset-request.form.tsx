import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { useDispatch } from "react-redux";

import { AuthHeader } from "./auth-header";
import { AuthInput } from "./auth-input";

type Props = {
  email: Signal<string>;
  emailError: Signal<string>;
};

export const PasswordResetRequestForm = (props: Props) => {
  const dispatch = useDispatch();

  const disabled = useSignal(true);

  effect(() => {
    disabled.value = props.email.value === "" || props.emailError.value != "";
  });

  function requestPasswordReset(event: Types.OnSubmit): void {
    event.preventDefault();
    if (!disabled.value) {
      dispatch(
        Sagas.requestPasswordResetRequest({
          email: props.email.value,
        })
      );
    }
  }

  return (
    <form onSubmit={requestPasswordReset}>
      <AuthHeader />

      <AuthInput
        type="email"
        placeholder="Email"
        userInput={props.email}
        errorMessage={props.emailError}
      />

      <Components.Button
        text="Request Reset"
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        disabled={disabled}
        submit
        centered
        primary
      />
    </form>
  );
};
