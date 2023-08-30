import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";

import { SettingsForm } from "./settings-form";
import { useDispatch } from "react-redux";
import { signalsStore } from "@/signals/signals";

const { confirmationModalOpen } = signalsStore;

export const DangerousForm = () => {
  const dispatch = useDispatch();

  function deleteAccount(): void {
    if (Helpers.userId) {
      console.log("Delete Account");
      // dispatch(
      //   Sagas.deleteUserRequest({
      //     userId: Helpers.userId,
      //   })
      // );
    }
  }

  return (
    <>
      <SettingsForm
        title="Dangerous"
        submit={() => (confirmationModalOpen.value = true)}
        buttonText="Delete Account"
        inputs
      />
      <Components.ConfirmationModal
        title="Are you sure you want to delete your account?"
        caption="Once deleted, it will be gone forever."
        submit={deleteAccount}
      />
    </>
  );
};
