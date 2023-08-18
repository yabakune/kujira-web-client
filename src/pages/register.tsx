import { useSignal } from "@preact/signals-react";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  const email = useSignal("");

  useEffect(() => {
    authStep.value = "Registration";
  }, []);

  return (
    <>
      <Components.PageHead title="Register" />

      {authStep.value === "Registration" ? (
        <Components.RegistrationForm email={email} />
      ) : authStep.value === "Verify Registration" ? (
        <Components.VerificationForm
          pageStep="Verify Registration"
          email={email}
        />
      ) : null}
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
