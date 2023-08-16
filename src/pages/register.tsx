import { useSignal } from "@preact/signals-react";
import { ReactElement } from "react";

import * as Components from "@/components";
import * as Types from "@/types";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");

  const agreementChecked = useSignal(false);

  function register(event: Types.OnSubmit): void {
    event.preventDefault();
    alert("Register");
  }

  return (
    <>
      <Components.PageHead title="Register" />

      <form onSubmit={register}>
        <Components.AuthHeader pageType="Registration" />

        <Components.AuthInputs
          pageType="Registration"
          email={email}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
        />

        <Components.Agreement
          checked={agreementChecked}
          pageType="Registration"
        />

        <Components.Button
          text="Create Account"
          rightIcon={<Components.ArrowRight width={14} fill={12} />}
          submit
          centered
          primary
        />
      </form>
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
