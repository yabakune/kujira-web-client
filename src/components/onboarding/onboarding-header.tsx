import { Signal } from "@preact/signals-react";

import * as Components from "@/components";

import Styles from "./onboarding-header.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  title: string;
  page: Signal<number>;
  decrementPage: () => void;
};

export const OnboardingHeader = (props: Props) => {
  return (
    <header className={Styles.container}>
      <button
        className={Snippets.iconButton}
        type="button"
        onClick={props.decrementPage}
      ></button>

      <Components.ButtonIcon backgroundLevel={2} onClick={props.decrementPage}>
        <Components.ArrowLeft width={14} fill={8} />
      </Components.ButtonIcon>

      <h1 className={`${Styles.title} ${Snippets.titleText}`}>{props.title}</h1>
      <h2 className={Styles.page}>{props.page.value}/6</h2>
    </header>
  );
};
