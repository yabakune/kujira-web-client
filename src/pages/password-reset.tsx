import { effect, useSignal } from "@preact/signals-react";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const PasswordReset: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  const email = useSignal("");
  const emailError = useSignal("");

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
  });

  useEffect(() => {
    authStep.value = "Password Reset Request";
  }, []);

  return (
    <>
      <Components.PageHead title="PasswordReset" />

      {authStep.value === "Password Reset Request" ? (
        <Components.PasswordResetRequestForm
          email={email}
          emailError={emailError}
        />
      ) : authStep.value === "Password Reset Action" ? (
        <Components.PasswordResetActionForm
          email={email}
          emailError={emailError}
        />
      ) : authStep.value === "Verify Password Reset" ? (
        <Components.VerificationForm
          pageStep="Verify Password Reset"
          email={email}
        />
      ) : null}
    </>
  );
};

PasswordReset.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default PasswordReset;
