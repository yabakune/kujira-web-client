import { Signal } from "@preact/signals-react";

import Styles from "./password-strength.module.scss";

function determinePasswordStrength(password: string): string {
  if (password.length > 0 && password.length < 16) {
    return "Weak";
  } else if (password.length >= 16 && password.length < 20) {
    return "Moderate";
  } else if (password.length >= 20 && password.length < 24) {
    return "Strong";
  } else {
    return "Excellent";
  }
}

function determinePasswordProgression(password: string): string {
  if (determinePasswordStrength(password) === "Weak") {
    return Styles.weak;
  } else if (determinePasswordStrength(password) === "Moderate") {
    return Styles.moderate;
  } else if (determinePasswordStrength(password) === "Strong") {
    return Styles.strong;
  } else {
    return Styles.excellent;
  }
}

type Props = {
  password: Signal<string>;
  passwordError: Signal<string>;
};

export const PasswordStrength = (props: Props) => {
  if (props.password.value.length > 0 && props.passwordError.value === "") {
    return (
      <section className={Styles.container}>
        <p className={Styles.text}>
          {determinePasswordStrength(props.password.value)} Password
        </p>

        <div className={Styles.progressBar}>
          <div
            className={`
						${Styles.progression}
						${determinePasswordProgression(props.password.value)}`}
          />
        </div>
      </section>
    );
  } else {
    return null;
  }
};
