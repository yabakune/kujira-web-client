import { Signal } from "@preact/signals-react";

import * as Components from "@/components";

import Styles from "./onboarding-header.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const titles = [
  "Hi, and welcome to Kujira!",
  "Your take-home income.",
  "Your savings.",
  "Your monthly recurring purchases.",
  "Your incoming purchases.",
  "Final step.",
];

type Props = {
  page: Signal<number>;
};

export const OnboardingHeader = (props: Props) => {
  console.log("Onboarding header rendered");

  function decrementPage(): void {
    if (props.page.value > 1) props.page.value -= 1;
  }

  return (
    <header className={Styles.container}>
      {props.page.value > 1 && (
        <Components.ButtonIcon backgroundLevel={2} onClick={decrementPage}>
          <Components.ArrowLeft width={14} fill={8} />
        </Components.ButtonIcon>
      )}

      <h1 className={`${Styles.title} ${Snippets.titleText}`}>
        {titles[props.page.value - 1]}
      </h1>
      <h2 className={Styles.page}>{props.page.value}/6</h2>
    </header>
  );
};
