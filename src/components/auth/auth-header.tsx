import Link from "next/link";

import * as Constants from "@/constants";
import * as Types from "@/types";

import Styles from "./auth-header.module.scss";
import TextStyles from "@/styles/texts.module.scss";

export const AuthHeader = (props: Types.AuthFormProps) => {
  return (
    <section className={Styles.section}>
      <h1 className={TextStyles.titleText}>
        {props.type === "Register" ? "Welcome!" : "Welcome back!"}
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
      ) : (
        <p>
          {"Don't have an account? "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.REGISTER}
          >
            Register
          </Link>
        </p>
      )}
    </section>
  );
};
