import { Signal } from "@preact/signals-react";
import { memo } from "react";

import * as Components from "@/components";
import * as Types from "@/types";

import Styles from "./settings-form.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  title: string;
  children?: React.ReactNode;
  submit: () => void;
  disabled?: Signal<boolean>;
  buttonText?: string;
  inputs?: true;
};

const ExportedComponent = (props: Props) => {
  function submit(event: Types.OnSubmit): void {
    event.preventDefault();
    props.submit();
  }

  return (
    <form
      key={`Dashboard Settings ${props.title} Form`}
      className={Styles.container}
      onSubmit={submit}
    >
      <h2 className={Snippets.titleText}>{props.title}</h2>

      {props.children && (
        <section className={`${Styles.body} ${props.inputs && Styles.inputs}`}>
          {props.children}
        </section>
      )}

      {props.inputs && (
        <Components.Button
          text={props.buttonText || "Update"}
          disabled={props.disabled}
          centered
          primary
          submit
        />
      )}
    </form>
  );
};

export const SettingsForm = memo(ExportedComponent);
