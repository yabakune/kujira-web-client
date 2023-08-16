import { useSignal } from "@preact/signals-react";
import { ReactElement } from "react";

import * as Components from "@/components";
import * as Types from "@/types";
import { NextPageWithLayout } from "./_app";

const Login: NextPageWithLayout = () => {
  const email = useSignal("");
  const password = useSignal("");
  const disabled = useSignal(true);

  function login(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!disabled.value) {
      console.log("Email:", email.value);
      console.log("Password:", password.value);
    }
  }

  return (
    <>
      <Components.PageHead title="Login" />

      <form onSubmit={login}>
        <Components.AuthHeader pageType="Login" />

        <Components.AuthInputs
          pageType="Login"
          email={email}
          password={password}
          disabled={disabled}
        />

        <Components.Button
          text="Log In"
          rightIcon={<Components.ArrowRight width={14} fill={12} />}
          disabled={disabled.value}
          submit
          centered
          primary
        />
      </form>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
