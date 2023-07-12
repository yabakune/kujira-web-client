import { Signal, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";

import { AuthFormHeader } from "./auth-form-header";
import { AuthFormAgreement } from "./auth-form-agreement";

import Styles from "./auth-form.module.scss";
import { AuthFormInputs } from "./auth-form-inputs";

type Props = { verificationStep: Signal<boolean> } & Types.AuthFormProps;

export const AuthForm = (props: Props) => {
  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const agreementChecked = useSignal(false);

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  function handleButtonDisable(): boolean {
    if (props.type === "Register") {
      return (
        email.value === "" ||
        username.value === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        !!emailError.value ||
        !!usernameError.value ||
        !!passwordError.value ||
        !!confirmPasswordError.value ||
        !agreementChecked.value
      );
    } else {
      return (
        email.value === "" ||
        password.value === "" ||
        !!emailError.value ||
        !!passwordError.value
      );
    }
  }

  function submit(event: Types.OnSubmit) {
    event.preventDefault();

    if (props.type === "Register") {
      alert("Submitted Registration Form!");
    } else {
      alert("Submitted Login Form!");
    }

    // If API returns successful 200
    props.verificationStep.value = true;
  }

  return (
    <form className={Styles.form} onSubmit={submit}>
      <AuthFormHeader type={props.type} />

      <AuthFormInputs
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        emailError={emailError}
        usernameError={usernameError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        type={props.type}
      />

      <AuthFormAgreement
        type={props.type}
        agreementChecked={agreementChecked}
      />

      <Components.Button
        type="submit"
        text={props.type}
        disabled={handleButtonDisable()}
        centerContents
        primary
      />
    </form>
  );
};
