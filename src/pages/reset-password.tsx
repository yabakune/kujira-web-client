import { useSignal } from "@preact/signals-react";

import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";
import { signalsStore } from "@/signals/signals";

const ResetPassword: NextPageWithLayout = () => {
  const { authVerificationCodeSent, resetPassword } = signalsStore;

  const email = useSignal("");

  return (
    <>
      <Components.PageHead title="Reset Password" />

      {!authVerificationCodeSent.value || resetPassword.value ? (
        <Components.AuthForm
          type="Password Reset"
          email={email}
          authVerificationCodeSent={authVerificationCodeSent}
        />
      ) : (
        <Components.AuthVerification
          type="Password Reset"
          email={email.value}
          authVerificationCodeSent={authVerificationCodeSent}
        />
      )}
    </>
  );
};

ResetPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default ResetPassword;
