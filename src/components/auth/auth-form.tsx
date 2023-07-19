import { Signal, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { AuthFormHeader } from "./auth-form-header";
import { AuthFormInputs } from "./auth-form-inputs";
import { AuthFormAgreement } from "./auth-form-agreement";

import Styles from "./auth-form.module.scss";

type Props = {
  email: Signal<string>;
  authVerificationCodeSent: Signal<boolean>;
} & Types.AuthFormProps;

export const AuthForm = (props: Props) => {
  const dispatch = useDispatch();

  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const agreementChecked = useSignal(false);

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  function disableButtonOnError(): boolean {
    if (props.type === "Register") {
      return (
        props.email.value === "" ||
        username.value === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        !!emailError.value ||
        !!usernameError.value ||
        !!passwordError.value ||
        !!confirmPasswordError.value ||
        !agreementChecked.value
      );
    } else if (props.type === "Log In") {
      return (
        props.email.value === "" ||
        password.value === "" ||
        !!emailError.value ||
        !!passwordError.value
      );
    } else {
      if (!props.authVerificationCodeSent.value) {
        return props.email.value === "" || !!emailError.value;
      } else {
        return (
          password.value === "" ||
          confirmPassword.value === "" ||
          !!passwordError.value ||
          !!confirmPasswordError.value
        );
      }
    }
  }

  function submit(event: Types.OnSubmit) {
    event.preventDefault();

    if (!disableButtonOnError()) {
      if (props.type === "Register") {
        dispatch(
          Sagas.registerRequest({
            email: props.email.value,
            username: username.value,
            password: password.value,
          })
        );
      } else if (props.type === "Log In") {
        dispatch(
          Sagas.loginRequest({
            email: props.email.value,
            password: password.value,
          })
        );
      } else {
        if (!props.authVerificationCodeSent.value) {
          dispatch(
            Sagas.requestPasswordResetRequest({
              email: props.email.value,
            })
          );
        } else {
          dispatch(
            Sagas.resetPasswordRequest({
              email: props.email.value,
              newPassword: password.value,
            })
          );
        }
      }
    }
  }

  function generateButtonText(): string {
    if (props.type === "Password Reset") {
      if (props.authVerificationCodeSent.value) {
        return "Reset Password";
      } else {
        return "Request Password Reset";
      }
    } else {
      return props.type;
    }
  }

  return (
    <form className={Styles.form} onSubmit={submit}>
      <AuthFormHeader type={props.type} />

      <AuthFormInputs
        email={props.email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        emailError={emailError}
        usernameError={usernameError}
        passwordError={passwordError}
        confirmPasswordError={confirmPasswordError}
        type={props.type}
        authVerificationCodeSent={props.authVerificationCodeSent}
      />

      {props.type === "Register" && (
        <AuthFormAgreement
          type="Register"
          agreementChecked={agreementChecked}
        />
      )}

      <Components.Button
        type="submit"
        text={generateButtonText()}
        disabled={disableButtonOnError()}
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        centerContents
        addClick
        primary
      />
    </form>
  );
};
