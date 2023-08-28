import { effect, useSignal } from "@preact/signals-react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

import * as Components from "@/components";
import * as Constants from "@/constants";
import { signalsStore } from "@/signals/signals";
import { NextPageWithLayout } from "./_app";

const PasswordReset: NextPageWithLayout = () => {
  const router = useRouter();
  const { authStep } = signalsStore;

  const email = useSignal("");
  const emailError = useSignal("");

  effect(() => {
    if (email.value === "") {
      emailError.value = "";
    } else {
      if (!email.value.includes("@")) {
        emailError.value = `Email must contain "@".`;
      } else if (!email.value.includes(".com")) {
        emailError.value = `Email must contain ".com".`;
      } else {
        emailError.value = "";
      }
    }
  });

  useEffect(() => {
    authStep.value = "Password Reset Request";
  }, []);

  useEffect(() => {
    if (authStep.value === "") {
      router.push(Constants.ClientRoutes.LOGIN);
    }
  }, [authStep.value]);

  return (
    <>
      <Components.PageHead title="Password Reset" />

      {authStep.value === "Password Reset Request" ? (
        <Components.PasswordResetRequestForm
          email={email}
          emailError={emailError}
        />
      ) : authStep.value === "Verify Password Reset" ? (
        <Components.VerificationForm email={email} withArrow />
      ) : authStep.value === "Password Reset Action" ? (
        <Components.PasswordResetActionForm
          email={email}
          emailError={emailError}
        />
      ) : null}
    </>
  );
};

PasswordReset.getLayout = function getLayout(page: ReactElement) {
  return (
    <Components.AuthenticationLayout>{page}</Components.AuthenticationLayout>
  );
};

export default PasswordReset;
