import { ReactElement } from "react";

import * as Components from "@/components";
import * as Types from "@/types";
import { NextPageWithLayout } from "./_app";
import { signalsStore } from "@/signals/signals";

const PasswordReset: NextPageWithLayout = () => {
  const { passwordResetStep } = signalsStore;

  function handleSubmit(event: Types.OnSubmit): void {
    event.preventDefault();

    if (passwordResetStep.value === "Request Reset") {
      alert("Request Reset");
    } else if (passwordResetStep.value === "Verify Email") {
      alert("Verify Email");
    } else {
      alert("Reset Password");
    }
  }

  return (
    <>
      <Components.PageHead title="PasswordReset" />

      <form onSubmit={handleSubmit}>
        <Components.AuthHeader pageType="Password Reset" />

        {passwordResetStep.value === "Request Reset" ? (
          <Components.RequestReset />
        ) : (
          <></>
        )}
      </form>
    </>
  );
};

PasswordReset.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default PasswordReset;
