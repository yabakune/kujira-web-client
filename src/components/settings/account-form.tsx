import { effect, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";

import { SettingsForm } from "./settings-form";

type Props = {
  email: string;
  username: string;
};

export const AccountForm = (props: Props) => {
  console.log("Account form rendered");

  const dispatch = useDispatch();

  const email = useSignal(props.email);
  const username = useSignal(props.username);
  const emailError = useSignal("");
  const usernameError = useSignal("");
  const disabled = useSignal(true);

  effect(() => {
    if (email.value === "") {
      emailError.value = "";
    } else {
      if (!email.value.includes("@")) {
        emailError.value = `Email must contain "@".`;
      } else if (!email.value.includes(".com")) {
        emailError.value = `Email must contain ".com".`;
      } else {
        emailError.value = "";
      }
    }

    if (username) {
      if (username.value === "") {
        usernameError.value = "";
      } else {
        if (username.value.length < 6) {
          usernameError.value = "Username too short.";
        } else if (username.value.length > 14) {
          usernameError.value = "Username too long.";
        } else if (!Helpers.checkValidUsername(username.value)) {
          usernameError.value = "Invalid username.";
        } else {
          usernameError.value = "";
        }
      }
    }

    disabled.value =
      (email.value === props.email && username.value === props.username) ||
      email.value === "" ||
      username.value === "" ||
      emailError.value !== "" ||
      usernameError.value !== "";
  });

  function submit(): void {
    if (!disabled.value && Helpers.userId) {
      dispatch(
        Sagas.updateUserRequest({
          email: email.value,
          username: username.value,
          userId: Helpers.userId,
        })
      );
    }
  }

  return (
    <SettingsForm title="Account" submit={submit} disabled={disabled} inputs>
      <Components.AuthInput
        key="Settings Account Form Email Input"
        type="text"
        placeholder="Email"
        userInput={email}
        errorMessage={emailError}
      />

      <Components.AuthInput
        key="Settings Account Form Username Input"
        type="text"
        placeholder="Username"
        userInput={username}
        errorMessage={usernameError}
      />
    </SettingsForm>
  );
};
