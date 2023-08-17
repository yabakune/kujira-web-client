import Link from "next/link";

import * as Types from "@/types";

import Styles from "./header.module.scss";
import Snippets from "@/styles/snippets.module.scss";

function generateCaptions(pageStep: Types.AuthPageStep): JSX.Element {
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
      return <></>;
  }
}

type Props = {
  pageStep: Types.AuthPageStep;
};

export const AuthHeader = (props: Props) => {
  return (
    <header className={Styles.container}>
      <h1 className={Styles.title}>{props.pageStep}</h1>

      <section className={Styles.captions}>
        <p className={Styles.instruction}>
          {props.pageStep.includes("Verify")
            ? "Please enter the verification code sent to your email below."
            : "Please fill in all fields below."}
        </p>
        {generateCaptions(props.pageStep)}
      </section>
    </header>
  );
};
