import { Signal, useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input.module.scss";

type Props = {
  userInput: Signal<string>;
  placeholder: string;
  borderRadius?: number;
  backgroundLevel?: number;
  required?: true;
};

export const Input = (props: Props) => {
  const inputRef = useRef<any>(null);
  const focused = useSignal(false);

  function setUserInput(event: Types.OnChange): void {
    props.userInput.value = event.currentTarget.value;
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
    <article
      className={`
        ${Styles.article}
        ${Helpers.setBackgroundLevel(props.backgroundLevel || 1, focused.value)}
        ${Helpers.setActiveLevel(props.backgroundLevel || 1)}
        ${Helpers.setHoverLevel(props.backgroundLevel || 1)}
      `}
      style={{
        borderRadius: Helpers.setBorderRadius(props.borderRadius),
      }}
      tabIndex={-1}
      onClick={focusInput}
    >
      <input
        className={Styles.input}
        onChange={setUserInput}
        value={props.userInput.value}
        placeholder={props.placeholder}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={!!props.required}
      />
    </article>
  );
};
