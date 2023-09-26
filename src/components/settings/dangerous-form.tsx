import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import { signalsStore } from "@/signals/signals";

import { SettingsForm } from "./settings-form";

const { confirmationModalOpen } = signalsStore;

const ExportedComponent = () => {
  const dispatch = useDispatch();

  const deleteAccount = useCallback((): void => {
    if (Helpers.userId) {
      dispatch(
        Sagas.deleteUserRequest({
          userId: Helpers.userId,
        })
      );
    }
  }, []);

  return (
    <>
      <SettingsForm
        title="Dangerous"
        submit={() => (confirmationModalOpen.value = true)}
        buttonText="Delete Account"
        weak={true}
        inputs
        border
      />
      <Components.ConfirmationModal
        title="Are you sure you want to delete your account?"
        caption="Once deleted, it will be gone forever."
        submit={deleteAccount}
      />
    </>
  );
};

export const DangerousForm = memo(ExportedComponent);
