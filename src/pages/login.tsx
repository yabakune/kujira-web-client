import { useSignal } from "@preact/signals-react";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const { authStep } = signalsStore;

const Login: NextPageWithLayout = () => {
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
        <Components.VerificationForm email={email} />
      ) : null}
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Components.AuthenticationLayout>{page}</Components.AuthenticationLayout>
  );
};

export default Login;

export async function getServerSideProps() {
  return { props: { authenticationRoute: true } };
}
