import { Signal, useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { AuthHeader } from "./header";
import { AuthInputs } from "./inputs";

type Props = {
  email: Signal<string>;
};

export const LoginForm = (props: Props) => {
  const dispatch = useDispatch();

  const password = useSignal("");
  const disabled = useSignal(true);

  function login(event: Types.OnSubmit): void {
    event.preventDefault();

    if (!disabled.value) {
      dispatch(
        Sagas.loginRequest({
          email: props.email.value,
          password: password.value,
        })
      );
    }
  }

  return (
    <form onSubmit={login}>
      <AuthHeader pageType="Login" />

      <AuthInputs
        pageType="Login"
        email={props.email}
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
  );
};
