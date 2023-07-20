import { Signal, useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./overview-cell.module.scss";

type Props = {
  label: string;
  value: Signal<string>;
  cost?: true;
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

  return (
    <div
      className={`
				${Styles.container}
			`}
      onClick={focusInput}
    >
      <span className={Styles.label}>{props.label}</span>

      <button
        className={`${Styles.inputContainer} 
				${Helpers.setBackgroundLevel(3)}
				${Helpers.setClickLevel(3)}
				${Helpers.setHoverLevel(3)}`}
        type="button"
      >
        {props.cost && <span className={Styles.costSymbol}>$</span>}
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
    </div>
  );
};
