import { Signal, useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input.module.scss";

type Props = {
  type: "text" | "email" | "password";
  userInput: Signal<string>;
  placeholder: string;

  borderRadius?: number;
  backgroundLevel?: number;
  required?: true;
  mini?: true;
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
        ${Styles.size} ${props.mini ? Styles.mini : Styles.default}
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
      <Components.ArrowRight width={16} fill={10} />

      <input
        className={Styles.input}
        type={props.type}
        onChange={setUserInput}
        value={props.userInput.value}
        placeholder={props.placeholder}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={!!props.required}
      />

      <Components.ArrowRight width={16} fill={8} hoverFill={11} addHover />
    </article>
  );
};
