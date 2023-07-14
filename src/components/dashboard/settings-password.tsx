import { effect, useSignal } from "@preact/signals-react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { ReduxState } from "@/redux";

import { SettingsSection } from "./settings-section";

import TextStyles from "@/styles/texts.module.scss";

export const SettingsPassword = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: ReduxState) => state.entities);

  const currentPassword = useSignal("");
  const newPassword = useSignal("");
  const confirmNewPassword = useSignal("");

  const currentPasswordError = useSignal("");
  const newPasswordError = useSignal("");
  const confirmNewPasswordError = useSignal("");

  function handleCurrentPasswordErrors(): void {
    if (currentPassword.value.length === 0) {
      currentPasswordError.value = "";
    } else {
      if (false) {
        currentPasswordError.value = "Foo";
      } else {
        currentPasswordError.value = "";
      }
    }
  }

  function handleNewPasswordErrors(): void {
    if (newPassword.value.length === 0) {
      newPasswordError.value = "";
    } else {
      if (!Helpers.checkValidPassword(newPassword.value)) {
        newPasswordError.value =
          "Password must contain at least one capital and lowercase letter and at least one of the following special characters: @, !, %, #.";
      } else if (newPassword.value.length < 12) {
        newPasswordError.value = "Password too short.";
      } else if (newPassword.value === currentPassword.value) {
        newPasswordError.value = "New password cannot match current password.";
      } else {
        newPasswordError.value = "";
      }
    }
  }

  function handleConfirmNewPasswordErrors(): void {
    if (confirmNewPassword.value.length === 0) {
      confirmNewPasswordError.value = "";
    } else {
      if (confirmNewPassword.value !== newPassword.value) {
        confirmNewPasswordError.value = "New passwords must match.";
      } else {
        confirmNewPasswordError.value = "";
      }
    }
  }

  effect(() => {
    handleCurrentPasswordErrors();
    handleNewPasswordErrors();
    handleConfirmNewPasswordErrors();
  });

  function disableSubmitOnErrors(): boolean {
    return (
      newPassword.value === "" ||
      confirmNewPassword.value === "" ||
      !!currentPasswordError.value ||
      !!newPasswordError.value ||
      !!confirmNewPasswordError.value
    );
  }

  function updatePassword(event: Types.OnSubmit): void {
    event.preventDefault();
    if (currentUser && !disableSubmitOnErrors()) {
      dispatch(
        Sagas.updateUserPasswordRequest({
          userId: currentUser.id,
          oldPassword: currentPassword.value,
          newPassword: newPassword.value,
        })
      );
      console.log("Updated Password");
    }
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-session"
      title="Password"
      onSubmit={updatePassword}
    >
      {currentPasswordError.value && (
        <p className={TextStyles.formError}>{currentPasswordError.value}</p>
      )}
      <Components.Input
        type="password"
        userInput={currentPassword}
        placeholder="Current Password"
        leftIcon={<Components.Lock width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        isPassword
        required
      />

      {newPasswordError.value && (
        <p className={TextStyles.formError}>{newPasswordError.value}</p>
      )}
      <Components.Input
        type="password"
        userInput={newPassword}
        placeholder="New Password"
        leftIcon={<Components.Lock width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        isPassword
        required
      />

      {confirmNewPasswordError.value && (
        <p className={TextStyles.formError}>{confirmNewPasswordError.value}</p>
      )}
      <Components.Input
        type="password"
        userInput={confirmNewPassword}
        placeholder="Confirm New Password"
        leftIcon={<Components.Lock width={16} fill={10} />}
        borderRadius={10}
        backgroundLevel={4}
        isPassword
        required
      />

      <Components.Button
        type="submit"
        text="Update"
        borderRadius={10}
        disabled={disableSubmitOnErrors()}
        centerContents
        addClick
        primary
      />
    </SettingsSection>
  );
};
