import Link from "next/link";
import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./agreement.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const RegistrationAgreement = () => {
  return (
    <p className={Styles.registrationAgreement}>
      I have read and understood the{" "}
      <Link
        className={Snippets.primaryLink}
        href="/terms-of-service"
        target="_blank"
        onClick={Helpers.preventBubbling}
      >
        Terms and Conditions
      </Link>
      ,{" "}
      <Link
        className={Snippets.primaryLink}
        href="/privacy-policy"
        target="_blank"
        onClick={Helpers.preventBubbling}
      >
        Privacy Policy
      </Link>
      , and{" "}
      <Link
        className={Snippets.primaryLink}
        href="/cookie-policy"
        target="_blank"
        onClick={Helpers.preventBubbling}
      >
        Cookie Policy
      </Link>
      .
    </p>
  );
};

type Props = {
  checked: Signal<boolean>;
  pageType: Types.AuthPageStep;
};

export const Agreement = (props: Props) => {
  function toggleChecked(): void {
    props.checked.value = !props.checked.value;
  }

  return (
    <button className={Styles.container} type="button" onClick={toggleChecked}>
      <div className={Snippets.iconButton}>
        {props.checked.value ? (
          <Components.CheckboxFilled width={24} fill={13} />
        ) : (
          <Components.Checkbox width={24} fill={8} />
        )}
      </div>

      {props.pageType === "Registration" ? (
        <RegistrationAgreement />
      ) : (
        <p>Stay logged in for 30 days.</p>
      )}
    </button>
  );
};
