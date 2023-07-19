import Link from "next/link";

import * as Constants from "@/constants";
import * as Types from "@/types";

import Styles from "./auth-form-header.module.scss";
import TextStyles from "@/styles/texts.module.scss";

export const AuthFormHeader = (props: Types.AuthFormProps) => {
  return (
    <section className={Styles.section}>
      <h1 className={TextStyles.titleText}>
        {props.type === "Register"
          ? "Welcome!"
          : props.type === "Log In"
          ? "Welcome back!"
          : "Reset your password"}
      </h1>

      <p className={Styles.caption}>Please fill in all fields below.</p>

      {props.type === "Register" ? (
        <p>
          {"Already have an account? "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.LOGIN}
          >
            Log In
          </Link>
        </p>
      ) : props.type === "Log In" ? (
        <>
          <p>
            {"Don't have an account? "}
            <Link
              className={TextStyles.primaryLink}
              href={Constants.ClientRoutes.REGISTER}
            >
              Register
            </Link>
          </p>
          <p>
            {"Forgot your password? "}
            <Link
              className={TextStyles.primaryLink}
              href={Constants.ClientRoutes.RESET_PASSWORD}
            >
              Reset Password
            </Link>
          </p>
        </>
      ) : (
        <Link
          className={TextStyles.primaryLink}
          href={Constants.ClientRoutes.LOGIN}
        >
          Log In
        </Link>
      )}
    </section>
  );
};
