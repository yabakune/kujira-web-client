import { effect, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";

import { SettingsForm } from "./settings-form";
import { PasswordStrength } from "../auth/password-strength";

export const PasswordForm = () => {
  const dispatch = useDispatch();

  const currentPassword = useSignal("");
  const newPassword = useSignal("");
  const confirmNewPassword = useSignal("");
  const currentPasswordError = useSignal("");
  const newPasswordError = useSignal("");
  const confirmNewPasswordError = useSignal("");
  const disabled = useSignal(true);

  effect(() => {
    if (newPassword.value === "") {
      newPasswordError.value = "";
    } else {
      if (!Helpers.checkValidPassword(newPassword.value)) {
        newPasswordError.value =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: !, @, #, $, %, &.";
      } else if (newPassword.value.length < 12) {
        newPasswordError.value = "Password too short.";
      } else if (newPassword.value === currentPassword.value) {
        newPasswordError.value = "New password cannot match current password.";
      } else {
        newPasswordError.value = "";
      }
    }

    if (confirmNewPassword.value === "") {
      confirmNewPasswordError.value = "";
    } else {
      if (confirmNewPassword.value !== newPassword.value) {
        confirmNewPasswordError.value = "Passwords don't match.";
      } else {
        confirmNewPasswordError.value = "";
      }
    }

    disabled.value =
      currentPassword.value === "" ||
      newPassword.value === "" ||
      confirmNewPassword.value === "" ||
      currentPasswordError.value !== "" ||
      newPasswordError.value !== "" ||
      confirmNewPasswordError.value !== "";
  });

  function updatePassword(): void {
    if (!disabled.value && Helpers.userId) {
      dispatch(
        Sagas.updateUserPasswordRequest({
          oldPassword: currentPassword.value,
          newPassword: newPassword.value,
          userId: Helpers.userId,
        })
      );
    }
  }

  return (
    <SettingsForm
      title="Password"
      submit={updatePassword}
      disabled={disabled}
      inputs
    >
      <Components.AuthInput
        key="Settings Account Form Current Password Input"
        type="password"
        placeholder="Current Password"
        userInput={currentPassword}
        errorMessage={currentPasswordError}
        password
      />

      <Components.AuthInput
        key="Settings Account Form New Password Input"
        type="password"
        placeholder="New Password"
        userInput={newPassword}
        errorMessage={newPasswordError}
        password
      />

      <PasswordStrength
        password={newPassword}
        passwordError={newPasswordError}
      />

      <Components.AuthInput
        key="Settings Account Form Confirm New Password Input"
        type="password"
        placeholder="Confirm New Password"
        userInput={confirmNewPassword}
        errorMessage={confirmNewPasswordError}
        password
      />
    </SettingsForm>
  );
};
