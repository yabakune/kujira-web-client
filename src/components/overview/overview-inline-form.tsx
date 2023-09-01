import { Signal } from "@preact/signals-react";

import * as Components from "@/components";

import Styles from "./overview-inline-form.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  title: string;
  titlePrimary?: string;
  placeholder: string;
  userInput: Signal<string>;
  errorMessage: Signal<string>;
  icon: JSX.Element;
};

export const OverviewInlineForm = (props: Props) => {
  return (
    <section className={Styles.container}>
      <h2 className={Snippets.titleText}>
        {props.title}{" "}
        {props.titlePrimary && (
          <span className={Styles.titlePrimary}>{props.titlePrimary}</span>
        )}
      </h2>

      <Components.Input
        type="text"
        placeholder={props.placeholder}
        userInput={props.userInput}
        errorMessage={props.errorMessage}
        icon={props.icon}
        required
      />
    </section>
  );
};
