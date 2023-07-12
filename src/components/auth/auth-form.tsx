import { effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";

import { AuthFormHeader } from "./auth-form-header";

import Styles from "./auth-form.module.scss";

function checkValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9_.-]*[a-zA-Z0-9])?$/.test(username);
}

function checkValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%#]).*$/.test(password);
}

export const AuthForm = (props: Types.AuthFormProps) => {
  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const agreementChecked = useSignal(false);
  const verificationStep = useSignal(false);

  const emailError = useSignal("");
  const usernameError = useSignal("");
  const passwordError = useSignal("");
  const confirmPasswordError = useSignal("");

  function handleEmailErrors(): void {
    if (email.value.length === 0) {
      emailError.value = "";
    } else {
      if (!email.value.includes("@")) {
        emailError.value = 'Please include "@"';
      } else if (!email.value.includes(".com")) {
        emailError.value = 'Please include ".com"';
      } else {
        emailError.value = "";
      }
    }
  }

  function handleUsernameErrors(): void {
    if (username.value.length === 0) {
      usernameError.value = "";
    } else {
      if (!checkValidUsername(username.value)) {
        usernameError.value = "Invalid username.";
      } else if (username.value.length > 14) {
        usernameError.value = "Username too long.";
      } else {
        usernameError.value = "";
      }
    }
  }

  function handlePasswordErrors(): void {
    if (password.value.length === 0) {
      passwordError.value = "";
    } else {
      if (!checkValidPassword(password.value)) {
        passwordError.value =
          "Password must contain at least one capital and lowercase letter and at least one of the following special characters: @, !, %, #.";
      } else if (password.value.length < 12) {
        passwordError.value = "Password too short.";
      } else {
        passwordError.value = "";
      }
    }
  }

  function handleConfirmPasswordErrors(): void {
    if (confirmPassword.value.length === 0) {
      confirmPasswordError.value = "";
    } else {
      if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = "Passwords must match.";
      } else {
        confirmPasswordError.value = "";
      }
    }
  }

  effect(() => {
    handleEmailErrors();
    if (props.type === "Register") {
      handleUsernameErrors();
      handlePasswordErrors();
      handleConfirmPasswordErrors();
    }
  });

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
        !!confirmPasswordError.value
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
  }

  return (
    <form className={Styles.form} onSubmit={submit}>
      <AuthFormHeader type={props.type} />

      <section className={Styles.body}>
        {emailError.value && (
          <span className={Styles.error}>{emailError.value}</span>
        )}
        <Components.Input
          key="Auth Form Email Input"
          type="email"
          userInput={email}
          placeholder="Email"
          backgroundLevel={2}
          required
        />

        {props.type === "Register" && (
          <>
            {usernameError.value && (
              <span className={Styles.error}>{usernameError.value}</span>
            )}
            <Components.Input
              key="Auth Form Username Input"
              type="text"
              userInput={username}
              placeholder="Username"
              backgroundLevel={2}
              required
            />
          </>
        )}

        {passwordError.value && (
          <span className={Styles.error}>{passwordError.value}</span>
        )}
        <Components.Input
          key="Auth Form Password Input"
          type="password"
          userInput={password}
          placeholder="Password"
          backgroundLevel={2}
          required
        />

        {props.type === "Register" && (
          <>
            {confirmPasswordError.value && (
              <span className={Styles.error}>{confirmPasswordError.value}</span>
            )}
            <Components.Input
              key="Auth Form Confirm Password Input"
              type="password"
              userInput={confirmPassword}
              placeholder="Confirm Password"
              backgroundLevel={2}
              required
            />
          </>
        )}
      </section>

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
