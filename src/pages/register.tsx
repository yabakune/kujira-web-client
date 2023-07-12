import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";

const Register: NextPageWithLayout = () => {
  const verificationStep = useSignal(false);

  return (
    <>
      {verificationStep.value ? (
        <Components.AuthVerification type="Register" />
      ) : (
        <Components.AuthForm type="Register" />
      )}
    </>
  );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
