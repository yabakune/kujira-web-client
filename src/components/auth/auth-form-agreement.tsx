import Link from "next/link";
import { Signal } from "@preact/signals-react";

import * as Constants from "@/constants";
import * as Types from "@/types";

import Styles from "./auth-form-agreement.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = { agreementChecked: Signal<boolean> } & Types.AuthFormProps;

export const AuthFormAgreement = (props: Props) => {
  function toggleAgreement(): void {
    props.agreementChecked.value = !props.agreementChecked.value;
  }

  function preventBubbling(event: Types.OnClick<HTMLAnchorElement>): void {
    event.stopPropagation();
  }

  return (
    <section className={Styles.section} onClick={toggleAgreement}>
      {props.type === "Register" ? (
        <p>
          {"I agree to the "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.TERMS_OF_SERVICE}
            target="_blank"
            onClick={preventBubbling}
          >
            Terms Of Service
          </Link>
          {", "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.PRIVACY_POLICY}
            target="_blank"
            onClick={preventBubbling}
          >
            Privacy Policy
          </Link>
          {", and "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.COOKIE_POLICY}
            target="_blank"
            onClick={preventBubbling}
          >
            Cookie Policy
          </Link>
          {"."}
        </p>
      ) : (
        <p>Stay logged in for 30 days.</p>
      )}
    </section>
  );
};
