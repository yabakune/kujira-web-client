import { useSignal } from "@preact/signals-react";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => {
  const { authStep } = signalsStore;

  const email = useSignal("");

  useEffect(() => {
    authStep.value = "Login";
  }, []);

  return (
    <>
      <Components.PageHead title="Login" />

      {authStep.value === "Login" ? (
        <Components.LoginForm email={email} />
      ) : authStep.value === "Verify Login" ? (
        <Components.VerificationForm pageStep="Verify Login" email={email} />
      ) : (
        <></>
      )}
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
