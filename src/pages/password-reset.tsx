import { useSignal } from "@preact/signals-react";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const PasswordReset: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  const email = useSignal("");

  useEffect(() => {
    authStep.value = "Password Reset Request";
  }, []);

  return (
    <>
      <Components.PageHead title="PasswordReset" />

      {authStep.value === "Password Reset Request" ||
      authStep.value === "Password Reset Action" ? (
        <Components.PasswordResetForm email={email} />
      ) : authStep.value === "Verify Password Reset" ? (
        <Components.VerificationForm
          pageStep="Verify Password Reset"
          email={email}
        />
      ) : (
        <></>
      )}
    </>
  );
};

PasswordReset.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default PasswordReset;
