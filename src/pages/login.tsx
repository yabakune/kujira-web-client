import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";
import { signalsStore } from "@/signals/signals";

const Login: NextPageWithLayout = () => {
  const email = useSignal("");
  const agreementChecked = useSignal(false);
  const { authVerificationCodeSent } = signalsStore;

  return (
    <>
      {authVerificationCodeSent.value ? (
        <Components.AuthVerification
          type="Log In"
          email={email.value}
          authVerificationCodeSent={authVerificationCodeSent}
          agreementChecked={agreementChecked}
        />
      ) : (
        <Components.AuthForm
          type="Log In"
          email={email}
          authVerificationCodeSent={authVerificationCodeSent}
          agreementChecked={agreementChecked}
        />
      )}
    </>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
