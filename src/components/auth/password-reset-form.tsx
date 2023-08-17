import { Signal, effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import { AuthHeader } from "./header";
import { AuthInput } from "./auth-input";

type Props = {
  email: Signal<string>;
};

export const PasswordResetForm = (props: Props) => {
  const { authStep } = signalsStore;

  const password = useSignal("");
  const confirmPassword = useSignal("");
  const emailError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");
  const disabled = useSignal(true);

  function handleSubmit(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!disabled.value) {
      if (authStep.value === "Password Reset Request") {
        console.log("Password Reset Request");
      } else if (authStep.value === "Verify Password Reset") {
        console.log("Verify Password Reset");
      } else if (authStep.value === "Password Reset Action") {
        console.log("Password Reset Action");
      }
    }
  }

  function generateButtonIcon(): JSX.Element | undefined {
    if (authStep.value === "Password Reset Request") {
      return <Components.ArrowRight width={14} fill={12} />;
    } else {
      return undefined;
    }
  }

  effect(() => {
    if (authStep.value === "Password Reset Request") {
      if (props.email.value === "") {
        emailError.value = "";
      } else {
        if (!props.email.value.includes("@")) {
          emailError.value = `Email must contain "@".`;
        } else if (!props.email.value.includes(".com")) {
          emailError.value = `Email must contain ".com".`;
        } else {
          emailError.value = "";
        }
      }
    } else if (authStep.value === "Password Reset Action") {
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
    }

    disabled.value =
      (authStep.value === "Password Reset Request" &&
        props.email.value === "") ||
      (authStep.value === "Password Reset Action" && password.value === "") ||
      (authStep.value === "Password Reset Action" &&
        confirmPassword.value === "") ||
      emailError.value != "" ||
      passwordError.value != "" ||
      confirmPasswordError.value != "";

    console.log(props.email.value === "");
    console.log(password.value === "");
    console.log(confirmPassword.value === "");
    console.log(emailError.value != "");
    console.log(passwordError.value != "");
    console.log(confirmPasswordError.value != "");
  });

  return (
    <form onSubmit={handleSubmit}>
      <AuthHeader pageStep={authStep.value} />

      {authStep.value === "Password Reset Request" && (
        <AuthInput
          key="Auth Email Input"
          type="email"
          placeholder="Email"
          userInput={props.email}
          errorMessage={emailError.value}
        />
      )}

      {authStep.value === "Password Reset Action" && (
        <>
          <AuthInput
            key="Auth Password Input"
            type="password"
            placeholder="Password"
            userInput={password}
            errorMessage={passwordError.value}
            password
          />
          <AuthInput
            key="Auth Confirm Password Input"
            type="password"
            placeholder="Confirm Password"
            userInput={confirmPassword}
            errorMessage={confirmPasswordError.value}
            password
          />
        </>
      )}

      <Components.Button
        text={
          authStep.value === "Password Reset Request"
            ? "Request Reset"
            : "Reset Password"
        }
        rightIcon={generateButtonIcon()}
        disabled={disabled.value}
        submit
        centered
        primary
      />
    </form>
  );
};
