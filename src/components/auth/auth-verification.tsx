import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";

import Styles from "./auth-verification.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = { verificationStep: Signal<boolean> } & Types.AuthFormProps;

export const AuthVerification = (props: Props) => {
  const verificationCode = useSignal("");
  const verificationCodeError = useSignal("");

  function setVerificationCode(event: Types.OnChange): void {
    verificationCode.value = event.currentTarget.value;
  }

  function goBack(): void {
    props.verificationStep.value = false;
  }

  function resendCode(): void {
    alert("Resend Code");
  }

  function verifyCode(event: Types.OnSubmit): void {
    event.preventDefault();

    alert("Verify Code");
  }

  function handleButtonDisable(): boolean {
    return verificationCode.value === "" || !!verificationCodeError.value;
  }

  effect(() => {
    if (verificationCode.value.length === 0) {
      verificationCodeError.value = "";
    } else {
      if (!Number(verificationCode.value)) {
        verificationCodeError.value = "Must be a number.";
      } else {
        verificationCodeError.value = "";
      }
    }
  });

  return (
    <form className={Styles.form} onSubmit={verifyCode}>
      <header className={Styles.group}>
        <h1 className={TextStyles.titleText}>
          {props.type === "Register" ? "Verify Registration" : "Verify Login"}
        </h1>

        <button
          className={TextStyles.primaryLink}
          type="button"
          onClick={goBack}
          style={{ alignSelf: "flex-start" }}
        >
          Go back
        </button>

        <p className={Styles.caption}>
          Please enter the verification code sent to your email.
        </p>

        <p>
          {"Didn't receive a code? "}
          <button
            className={TextStyles.primaryLink}
            type="button"
            onClick={resendCode}
          >
            Resend Code
          </button>
        </p>
      </header>

      <article className={Styles.group}>
        {verificationCodeError.value && (
          <p className={Styles.error}>{verificationCodeError.value}</p>
        )}
        <Components.Input
          type="text"
          userInput={verificationCode}
          placeholder="Enter verification code here"
          leftIcon={<Components.Key width={16} fill={10} />}
          backgroundLevel={2}
          required
        />
        <Components.Button
          type="submit"
          text="Verify"
          disabled={handleButtonDisable()}
          centerContents
          primary
        />
      </article>
    </form>
  );
};
