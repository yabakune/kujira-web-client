import { effect, useSignal } from "@preact/signals-react";

import * as Components from "@/components";

export const RequestReset = () => {
  const email = useSignal("");
  const emailError = useSignal("");
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

    disabled.value = email.value === "" || emailError.value != "";
  });

  return (
    <>
      <Components.AuthInput
        type="email"
        placeholder="Email"
        userInput={email}
        errorMessage={emailError.value}
      />

      <Components.Button
        text="Request Reset"
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        disabled={disabled.value}
        submit
        centered
        primary
      />
    </>
  );
};
