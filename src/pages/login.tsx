import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";

const Login: NextPageWithLayout = () => {
  const verificationStep = useSignal(false);

  return (
    <>
      {verificationStep.value ? (
        <Components.AuthVerification type="Log In" />
      ) : (
        <Components.AuthForm type="Log In" />
      )}
    </>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
