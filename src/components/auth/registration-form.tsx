import { useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { Agreement } from "./agreement";
import { AuthHeader } from "./header";
import { AuthInputs } from "./inputs";

export const RegistrationForm = () => {
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
      dispatch(
        Sagas.registerRequest({
          email: email.value,
          username: username.value,
          password: password.value,
        })
      );
    }
  }

  return (
    <form onSubmit={register}>
      <AuthHeader pageType="Registration" />

      <AuthInputs
        pageType="Registration"
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        agreementChecked={agreementChecked}
        disabled={disabled}
      />

      <Agreement checked={agreementChecked} pageType="Registration" />

      <Components.Button
        text="Create Account"
        rightIcon={<Components.ArrowRight width={14} fill={12} />}
        disabled={disabled.value}
        submit
        centered
        primary
      />
    </form>
  );
};
