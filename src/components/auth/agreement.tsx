import Link from "next/link";
import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Types from "@/types";

import Styles from "./agreement.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const RegistrationAgreement = () => {
  return (
    <p>
      I have read and understood the{" "}
      <Link
        className={Snippets.primaryLink}
        href="/terms-of-service"
        target="_blank"
      >
        Terms and Conditions
      </Link>
      ,{" "}
      <Link
        className={Snippets.primaryLink}
        href="/privacy-policy"
        target="_blank"
      >
        Privacy Policy
      </Link>
      , and{" "}
      <Link
        className={Snippets.primaryLink}
        href="/cookie-policy"
        target="_blank"
      >
        Cookie Policy
      </Link>
      .
    </p>
  );
};

type Props = {
  checked: Signal<boolean>;
  pageType: Types.AuthPageType;
};

export const Agreement = (props: Props) => {
  function toggleChecked(): void {
    props.checked.value = !props.checked.value;
  }

  return (
    <button className={Styles.container} onClick={toggleChecked}>
      {props.checked.value ? (
        <Components.CheckboxFilled width={24} fill={13} />
      ) : (
        <Components.Checkbox width={24} fill={8} />
      )}

      {props.pageType === "Registration" ? (
        <RegistrationAgreement />
      ) : (
        <p>Stay logged in for 30 days.</p>
      )}
    </button>
  );
};
