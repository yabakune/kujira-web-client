import Link from "next/link";
import { Signal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Sagas from "@/sagas";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./header.module.scss";
import Snippets from "@/styles/snippets.module.scss";

function generateCaptions(pageStep: Types.AuthPageStep): JSX.Element | null {
  switch (pageStep) {
    case "Registration":
      return (
        <p>
          Already have an account?{" "}
          <Link className={Snippets.primaryLink} href="/login">
            Log In
          </Link>
        </p>
      );

    case "Login":
      return (
        <>
          <p>
            {"Don't have an account? "}
            <Link className={Snippets.primaryLink} href="/register">
              Register
            </Link>
          </p>
          <p>
            {"Forgot your password? "}
            <Link className={Snippets.primaryLink} href="/password-reset">
              Reset Password
            </Link>
          </p>
        </>
      );

    case "Password Reset Request" || "Password Reset Action":
      return (
        <>
          <p>
            {"Don't have an account? "}
            <Link className={Snippets.primaryLink} href="/register">
              Register
            </Link>
          </p>
          <p>
            {"Remembered your password? "}
            <Link className={Snippets.primaryLink} href="/login">
              Log In
            </Link>
          </p>
        </>
      );

    default:
      return null;
  }
}

type Props = {
  email?: Signal<string>;
};

const { authStep } = signalsStore;

export const AuthHeader = (props: Props) => {
  const dispatch = useDispatch();

  function requestNewCode(): void {
    if (props.email) {
      dispatch(
        Sagas.sendNewVerificationCodeRequest({ email: props.email.value })
      );
    }
  }

  return (
    <header className={Styles.container}>
      <h1 className={Styles.title}>{authStep.value}</h1>

      <section className={Styles.captions}>
        <p className={Styles.instruction}>
          {authStep.value.includes("Verify")
            ? "Please enter the verification code sent to your email below."
            : "Please fill in all fields below."}
        </p>

        {props.email && authStep.value.includes("Verify") && (
          <p>
            {"Need a new code? "}
            <button
              aria-label="Request New Code Button"
              className={Snippets.primaryLink}
              type="button"
              onClick={requestNewCode}
            >
              Request New Code
            </button>
          </p>
        )}

        {generateCaptions(authStep.value)}
      </section>
    </header>
  );
};
