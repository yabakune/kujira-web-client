import { Signal, effect, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { AuthInput } from "./auth-input";
import { AuthHeader } from "./header";

import Styles from "./inputs.module.scss";
import { PasswordStrength } from "./password-strength";

type Props = {
  email: Signal<string>;
  emailError: Signal<string>;
};

export const PasswordResetActionForm = (props: Props) => {
  const dispatch = useDispatch();

  const password = useSignal("");
  const confirmPassword = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");
  const disabled = useSignal(true);

  effect(() => {
    if (password.value === "") {
      passwordError.value = "";
    } else {
      if (!Helpers.checkValidPassword(password.value)) {
        passwordError.value =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: !, @, #, $, %, &.";
      } else if (password.value.length < 12) {
        passwordError.value = "Password too short.";
      } else {
        passwordError.value = "";
      }
    }

    if (confirmPassword) {
      if (confirmPassword.value === "") {
        confirmPasswordError.value = "";
      } else {
        if (confirmPassword.value !== password.value) {
          confirmPasswordError.value = "Passwords don't match.";
        } else {
          confirmPasswordError.value = "";
        }
      }
    }

    disabled.value =
      props.email.value === "" ||
      password.value === "" ||
      confirmPassword.value === "" ||
      props.emailError.value != "" ||
      passwordError.value != "" ||
      confirmPasswordError.value != "";
  });

  function resetPassword(event: Types.OnSubmit): void {
    event.preventDefault();
    if (!disabled.value) {
      dispatch(
        Sagas.resetPasswordRequest({
          email: props.email.value,
          newPassword: password.value,
        })
      );
    }
  }

  return (
    <form onSubmit={resetPassword}>
      <AuthHeader />

      <section className={Styles.inputs}>
        <AuthInput
          type="password"
          placeholder="Password"
          userInput={password}
          errorMessage={passwordError}
          password
        />

        <PasswordStrength password={password} passwordError={passwordError} />

        <AuthInput
          type="password"
          placeholder="Confirm Password"
          userInput={confirmPassword}
          errorMessage={confirmPasswordError}
          password
        />
      </section>

      <Components.Button
        text="Reset Password"
        disabled={disabled}
        submit
        centered
        primary
      />
    </form>
  );
};
