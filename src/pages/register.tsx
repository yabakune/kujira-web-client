import { useSignal } from "@preact/signals-react";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  const dispatch = useDispatch();

  const email = useSignal("");
  const username = useSignal("");
  const password = useSignal("");
  const confirmPassword = useSignal("");
  const agreementChecked = useSignal(false);
  const disabled = useSignal(true);

  function register(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!disabled.value) {
      // dispatch(
      //   Sagas.registerRequest({
      //     email: email.value,
      //     username: username.value,
      //     password: password.value,
      //   })
      // );

      console.log("Email:", email.value);
      console.log("Username:", username.value);
      console.log("Password:", password.value);
      console.log("Confirm Password:", confirmPassword.value);
    }
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
          agreementChecked={agreementChecked}
          disabled={disabled}
        />

        <Components.Agreement
          checked={agreementChecked}
          pageType="Registration"
        />

        <Components.Button
          text="Create Account"
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

Register.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
