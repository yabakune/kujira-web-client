import { useSignal } from "@preact/signals-react";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  const disabled = useSignal(true);

  useEffect(() => {
    authStep.value = "Registration";
  }, []);

  return (
    <>
      <Components.PageHead title="Register" />

      {authStep.value === "Registration" ? (
        <Components.RegistrationForm disabled={disabled} />
      ) : (
        <Components.VerificationForm title="Verify Registration" />
      )}
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
