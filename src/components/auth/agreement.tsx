import Link from "next/link";
import { Signal } from "@preact/signals-react";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import { signalsStore } from "@/signals/signals";

import Styles from "./agreement.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type LegalLink = { name: string; route: string };

const legalLinks: LegalLink[] = [
  { name: "Terms", route: Constants.ClientRoutes.TERMS_OF_SERVICE },
  { name: "Privacy Policy", route: Constants.ClientRoutes.PRIVACY_POLICY },
  { name: "Cookie Policy", route: Constants.ClientRoutes.COOKIE_POLICY },
];

const RegistrationAgreement = () => {
  return (
    <p className={Styles.registrationAgreement}>
      I have read and understood the{" "}
      {legalLinks.map((legalLink: LegalLink, index: number) => {
        return (
          <>
            <Link
              key={`auth-agreement-link-${legalLink.name}-${index}`}
              className={Snippets.primaryLink}
              href={legalLink.route}
              target="_blank"
              onClick={Helpers.preventBubbling}
            >
              {legalLink.name}
            </Link>
            {index === 0 ? ", " : index === 1 ? ", and " : "."}
          </>
        );
      })}
    </p>
  );
};

type Props = {
  checked: Signal<boolean>;
};

export const Agreement = (props: Props) => {
  const { authStep } = signalsStore;

  function toggleChecked(): void {
    props.checked.value = !props.checked.value;
  }

  return (
    <button
      aria-label="Auth Form Agreement Checkbox Button"
      className={Styles.container}
      type="button"
      onClick={toggleChecked}
    >
      <div className={Snippets.iconContainer}>
        {props.checked.value ? (
          <Components.CheckboxFilled width={24} fill={13} />
        ) : (
          <Components.Checkbox width={24} fill={8} />
        )}
      </div>

      {authStep.value === "Registration" ? (
        <RegistrationAgreement />
      ) : (
        <p>Stay logged in for 30 days.</p>
      )}
    </button>
  );
};
