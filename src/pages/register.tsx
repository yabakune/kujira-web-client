import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";

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
        <Components.VerificationForm email={email} />
      ) : null}
    </>
  );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Components.AuthenticationLayout>{page}</Components.AuthenticationLayout>
  );
};

export default Register;
