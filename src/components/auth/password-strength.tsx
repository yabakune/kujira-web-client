import { Signal } from "@preact/signals-react";

import Styles from "./password-strength.module.scss";

type PasswordStrength = "Weak" | "Moderate" | "Strong" | "Excellent";

function determinePasswordStrength(password: string): PasswordStrength {
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
};

export const PasswordStrength = (props: Props) => {
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
};