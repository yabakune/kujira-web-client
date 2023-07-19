import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";
import { signalsStore } from "@/signals/signals";

const Login: NextPageWithLayout = () => {
  const { authVerificationCodeSent } = signalsStore;

  const email = useSignal("");

  return (
    <>
      <Components.PageHead title="Log In" />

      {authVerificationCodeSent.value ? (
        <Components.AuthVerification
          type="Log In"
          email={email.value}
          authVerificationCodeSent={authVerificationCodeSent}
        />
      ) : (
        <Components.AuthForm
          type="Log In"
          email={email}
          authVerificationCodeSent={authVerificationCodeSent}
          arrow={true}
        />
      )}
    </>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
