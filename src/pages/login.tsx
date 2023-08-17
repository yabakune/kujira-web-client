import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  useEffect(() => {
    authStep.value = "Login";
  }, []);

  return (
    <>
      <Components.PageHead title="Login" />

      {authStep.value === "Login" ? (
        <Components.LoginForm />
      ) : (
        <Components.VerificationForm title="Verify Login" />
      )}
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
