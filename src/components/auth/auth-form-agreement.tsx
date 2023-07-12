import Link from "next/link";
import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./auth-form-agreement.module.scss";
import TextStyles from "@/styles/texts.module.scss";

type Props = { agreementChecked: Signal<boolean> } & Types.AuthFormProps;

export const AuthFormAgreement = (props: Props) => {
  function toggleAgreement(): void {
    props.agreementChecked.value = !props.agreementChecked.value;
  }

  return (
    <section className={Styles.section} onClick={toggleAgreement}>
      {props.agreementChecked.value ? (
        <Components.ButtonIcon continuePropagation>
          <Components.CheckboxActive width={18} fill={12} />
        </Components.ButtonIcon>
      ) : (
        <Components.ButtonIcon continuePropagation>
          <Components.Checkbox width={18} fill={10} />
        </Components.ButtonIcon>
      )}

      {props.type === "Register" ? (
        <p>
          {"I agree to the "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.TERMS_OF_SERVICE}
            target="_blank"
            onClick={Helpers.preventBubbling}
          >
            Terms Of Service
          </Link>
          {", "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.PRIVACY_POLICY}
            target="_blank"
            onClick={Helpers.preventBubbling}
          >
            Privacy Policy
          </Link>
          {", and "}
          <Link
            className={TextStyles.primaryLink}
            href={Constants.ClientRoutes.COOKIE_POLICY}
            target="_blank"
            onClick={Helpers.preventBubbling}
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
