import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  useEffect(() => {
    authStep.value = "Registration";
  }, []);

  return (
    <>
      <Components.PageHead title="Register" />

      {authStep.value === "Registration" ? (
        <Components.RegistrationForm />
      ) : (
        <Components.VerificationForm
          title="Verify Registration"
          pageType="Registration"
        />
      )}
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
