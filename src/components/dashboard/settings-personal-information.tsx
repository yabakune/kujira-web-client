import { effect, useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

import TextStyles from "@/styles/texts.module.scss";

export const SettingsPersonalInformation = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: Redux.ReduxState) => {
    return state.entities;
  });

  const email = useSignal("");
  const username = useSignal("");
  const emailError = useSignal("");
  const usernameError = useSignal("");

  useEffect(() => {
    if (currentUser) {
      email.value = currentUser.email;
      username.value = currentUser.username;
    }
  }, [currentUser]);

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
      if (!Helpers.checkValidUsername(username.value)) {
        usernameError.value = "Invalid username.";
      } else if (username.value.length > 14) {
        usernameError.value = "Username too long.";
      } else {
        usernameError.value = "";
      }
    }
  }

  effect(() => {
    handleEmailErrors();
    handleUsernameErrors();
  });

  function handlePersonalInformationDisabled(): boolean {
    return (
      email.value === "" ||
      username.value === "" ||
      !!emailError.value ||
      !!usernameError.value
    );
  }

  function submitPersonalInformation(event: Types.OnSubmit): void {
    event.preventDefault();
    if (currentUser) {
      dispatch(
        Sagas.updateUserRequest({
          userId: currentUser.id,
          email: email.value,
          username: username.value,
        })
      );
    }

    console.log("Submitted Personal Information");
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-personal-information"
      title="Personal Information"
      onSubmit={submitPersonalInformation}
    >
      {emailError.value && (
        <p className={TextStyles.formError}>{emailError.value}</p>
      )}
      <Components.Input
        type="text"
        userInput={email}
        placeholder="Email"
        leftIcon={<Components.Message width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        required
      />
      {usernameError.value && (
        <p className={TextStyles.formError}>{usernameError.value}</p>
      )}
      <Components.Input
        type="text"
        userInput={username}
        placeholder="Username"
        leftIcon={<Components.User width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        required
      />
      <Components.Button
        type="submit"
        text="Update"
        disabled={handlePersonalInformationDisabled()}
        borderRadius={10}
        centerContents
        addClick
        primary
      />
    </SettingsSection>
  );
};
