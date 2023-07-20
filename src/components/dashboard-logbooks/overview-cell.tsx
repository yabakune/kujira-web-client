import { Signal, effect, useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./overview-cell.module.scss";
import TextStyles from "@/styles/texts.module.scss";
import InterfaceStyles from "@/styles/interface.module.scss";

type Props = {
  label: string;
  value: Signal<string>;
  valueError?: Signal<string>;
  updateField?: (type: "Income" | "Savings", value: string) => void;
  cost?: true;
  frozen?: true;
};

export const OverviewCell = (props: Props) => {
  const inputRef = useRef<any>(null);
  const focused = useSignal(false);

  function setValue(event: Types.OnChange): void {
    props.value.value = event.currentTarget.value;
  }

  function setFocused(state: boolean): void {
    focused.value = state;
  }

  function focusInput(): void {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }

  effect(() => {
    if (props.valueError) {
      if (props.value.value.length === 0) {
        props.valueError.value = "";
      } else {
        if (!Number(props.value.value)) {
          props.valueError.value = "Must be a number.";
        } else {
          props.valueError.value = "";
        }
      }
    }
  });

  return (
    <article
      className={`${Styles.container} ${
        props.frozen && InterfaceStyles.noInteraction
      }`}
      onClick={focusInput}
    >
      <div className={Styles.label}>
        <span>{props.label}</span>
        {props.valueError && props.valueError.value && (
          <span className={TextStyles.formError}>{props.valueError.value}</span>
        )}
      </div>

      <button
        className={`
          ${Styles.inputContainer} 
          ${Helpers.setBackgroundLevel(3)}
          ${Helpers.setClickLevel(3)}
          ${Helpers.setHoverLevel(3)}
          ${props.frozen && Styles.frozen}
          ${props.valueError && props.valueError.value && Styles.error}
        `}
        type="button"
        tabIndex={-1}
      >
        {props.cost ? (
          <span className={Styles.costSymbol}>$</span>
        ) : (
          <span className={Styles.costSymbol}>%</span>
        )}
        <input
          className={Styles.input}
          type="text"
          onChange={setValue}
          value={props.value.value}
          placeholder={props.label}
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </button>
    </article>
  );
};
