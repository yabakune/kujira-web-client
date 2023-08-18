import { Signal, effect, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { AuthInput } from "./auth-input";
import { AuthHeader } from "./header";
import { Agreement } from "./agreement";

type Props = {
  email: Signal<string>;
  withArrow?: true;
};

export const VerificationForm = (props: Props) => {
  const dispatch = useDispatch();
  const { authStep } = signalsStore;

  const verificationCode = useSignal("");
  const verificationCodeError = useSignal("");
  const extendLoginDuration = useSignal(false);
  const disabled = useSignal(true);

  function verify(event: Types.OnSubmit): void {
    event.preventDefault();
    if (!disabled.value) {
      if (authStep.value === "Verify Registration") {
        dispatch(
          Sagas.verifyRegistrationRequest({
            email: props.email.value,
            verificationCode: verificationCode.value,
          })
        );
      } else if (authStep.value === "Verify Login") {
        dispatch(
          Sagas.verifyLoginRequest({
            email: props.email.value,
            verificationCode: verificationCode.value,
            thirtyDays: extendLoginDuration.value,
          })
        );
      } else if (authStep.value === "Verify Password Reset") {
        dispatch(
          Sagas.verifyPasswordResetRequest({
            email: props.email.value,
            verificationCode: verificationCode.value,
          })
        );
      }
    }
  }

  function generateButtonIcon(): JSX.Element | undefined {
    if (props.withArrow) return <Components.ArrowRight width={14} fill={12} />;
    else return undefined;
  }

  effect(() => {
    if (verificationCode.value.length === 8) {
      disabled.value = false;
    } else {
      disabled.value = true;
    }

    if (verificationCode.value.length === 0) {
      verificationCodeError.value = "";
    } else {
      if (!Number(verificationCode.value)) {
        verificationCodeError.value = "Must be a number";
      } else if (verificationCode.value.length < 8) {
        verificationCodeError.value = "Verification code too short.";
      } else if (verificationCode.value.length > 8) {
        verificationCodeError.value = "Verification code too long.";
      } else {
        verificationCodeError.value = "";
      }
    }
  });

  return (
    <form onSubmit={verify}>
      <AuthHeader email={props.email} />

      <AuthInput
        type="text"
        placeholder="Verification Code"
        userInput={verificationCode}
        errorMessage={verificationCodeError}
      />

      {authStep.value === "Verify Login" && (
        <Agreement checked={extendLoginDuration} />
      )}

      <Components.Button
        text="Verify"
        rightIcon={generateButtonIcon()}
        disabled={disabled}
        submit
        centered
        primary
      />
    </form>
  );
};
