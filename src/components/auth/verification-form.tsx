import { effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { AuthInput } from "./auth-input";
import { AuthHeader } from "./header";

type Props = {
  title: string;
  pageType: Types.AuthPageType;
  withArrow?: true;
};

export const VerificationForm = (props: Props) => {
  const { authStep } = signalsStore;

  const verificationCode = useSignal("");
  const verificationCodeError = useSignal("");
  const disabled = useSignal(true);

  function verify(event: Types.OnSubmit): void {
    event.preventDefault();
    if (!disabled.value) {
      authStep.value = "";
      console.log("Verify");
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
      <AuthHeader pageType="Verification" title={props.title} />

      <AuthInput
        type="text"
        placeholder="Verification Code"
        userInput={verificationCode}
        errorMessage={verificationCodeError.value}
      />

      <Components.Button
        text="Create Account"
        rightIcon={generateButtonIcon()}
        disabled={disabled.value}
        submit
        centered
        primary
      />
    </form>
  );
};
