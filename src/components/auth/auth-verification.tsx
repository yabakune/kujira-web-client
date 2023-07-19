import { Signal, effect, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { AuthFormAgreement } from "./auth-form-agreement";

import Styles from "./auth-verification.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = {
  email: string;
  authVerificationCodeSent: Signal<boolean>;
} & Types.AuthFormProps;

export const AuthVerification = (props: Props) => {
  const dispatch = useDispatch();

  const verificationCode = useSignal("");
  const agreementChecked = useSignal(false);

  const verificationCodeError = useSignal("");

  function goBack(): void {
    props.authVerificationCodeSent.value = false;
  }

  function resendCode(): void {
    dispatch(Sagas.sendNewVerificationCodeRequest({ email: props.email }));
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

  function verifyCode(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!handleButtonDisable()) {
      if (props.type === "Register") {
        dispatch(
          Sagas.verifyRegistrationRequest({
            email: props.email,
            verificationCode: verificationCode.value,
          })
        );
      } else if (props.type === "Log In") {
        dispatch(
          Sagas.verifyLoginRequest({
            email: props.email,
            verificationCode: verificationCode.value,
            thirtyDays: agreementChecked.value,
          })
        );
      } else {
        dispatch(
          Sagas.verifyPasswordResetRequest({
            email: props.email,
            verificationCode: verificationCode.value,
          })
        );
      }
    }
  }

  return (
    <form className={Styles.form} onSubmit={verifyCode}>
      <header className={Styles.group}>
        <h1 className={TextStyles.titleText}>
          {props.type === "Register" ? "Verify Registration" : "Verify Login"}
        </h1>

        <button
          aria-label="Go Back Button"
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
            aria-label="Resend Code Button"
            className={TextStyles.primaryLink}
            type="button"
            onClick={resendCode}
          >
            Resend Code
          </button>
        </p>
      </header>

      <article className={Styles.inputs}>
        {verificationCodeError.value && (
          <p className={TextStyles.formError}>{verificationCodeError.value}</p>
        )}
        <Components.Input
          type="text"
          userInput={verificationCode}
          placeholder="Enter verification code here"
          leftIcon={<Components.Key width={16} fill={10} />}
          backgroundLevel={2}
          required
        />
      </article>

      {props.type === "Log In" && (
        <AuthFormAgreement type="Log In" agreementChecked={agreementChecked} />
      )}

      <Components.Button
        type="submit"
        text="Verify"
        disabled={handleButtonDisable()}
        centerContents
        addClick
        primary
      />
    </form>
  );
};
