import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";
import { signalsStore } from "@/signals/signals";

const Register: NextPageWithLayout = () => {
  const { authVerificationCodeSent } = signalsStore;

  const email = useSignal("");
  const agreementChecked = useSignal(false);

  return (
    <>
      <Components.PageHead title="Register" />

      {authVerificationCodeSent.value ? (
        <Components.AuthVerification
          type="Register"
          email={email.value}
          authVerificationCodeSent={authVerificationCodeSent}
          agreementChecked={agreementChecked}
        />
      ) : (
        <Components.AuthForm
          type="Register"
          email={email}
          authVerificationCodeSent={authVerificationCodeSent}
          agreementChecked={agreementChecked}
        />
      )}
    </>
  );
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
