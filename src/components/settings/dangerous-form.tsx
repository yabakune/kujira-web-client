import { SettingsForm } from "./settings-form";

export const DangerousForm = () => {
  console.log("Dangerous form rendered");

  function submit(): void {
    console.log("Delete Account");
  }

  return (
    <SettingsForm
      title="Dangerous"
      submit={submit}
      buttonText="Delete Account"
      inputs
    />
  );
};
