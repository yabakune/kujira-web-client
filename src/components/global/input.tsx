import { Signal, useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  type: Types.UserInputType;
  placeholder: string;
  userInput: Signal<string>;
  errorMessage: Signal<string>;
  icon: JSX.Element;
  onClick?: (event: Types.OnClick<HTMLElement>) => void;
  backgroundLevel?: number;
  password?: true;
  autoFocus?: true;
  required?: true;
  small?: true;
  preventInteraction?: true;
  transparent?: true;
};

export const Input = (props: Props) => {
  const inputType = useSignal(props.type);
  const inputRef = useRef<any>(null);

  function focusInput(): void {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }

  function setUserInput(event: Types.OnChange): void {
    const userInput = event.currentTarget.value;
    props.userInput.value = userInput;
  }

  function togglePasswordInputType(
    event: Types.OnClick<HTMLButtonElement>
  ): void {
    Helpers.preventBubbling(event);
    if (props.password) {
      if (inputType.value === "password") inputType.value = "text";
      else inputType.value = "password";
    }
  }

  return (
    <article
      className={`
        ${Styles.container}
        ${props.preventInteraction && Snippets.noInteraction}
      `}
      onClick={props.onClick}
    >
      {props.errorMessage.value && (
        <p className={Styles.error}>{props.errorMessage.value}</p>
      )}

      <div
        className={`
					${Styles.inputContainer}
					${props.small && Styles.small}
          ${props.errorMessage.value && Styles.error}
          ${
            props.transparent
              ? Styles.transparent
              : Helpers.setBackgroundClickHover(props.backgroundLevel)
          }
				`}
        onClick={focusInput}
      >
        {props.icon && (
          <div className={Snippets.iconContainer}>{props.icon}</div>
        )}

        <input
          className={Styles.input}
          type={inputType.value}
          placeholder={props.placeholder}
          value={props.userInput.value}
          ref={inputRef}
          onChange={setUserInput}
          autoFocus={props.autoFocus}
          required={props.required}
        />

        {props.password && (
          <button
            aria-label="Password Input Type Toggle Button"
            className={Snippets.iconContainer}
            onClick={togglePasswordInputType}
            type="button"
          >
            {inputType.value === "password" ? (
              <Components.EyeHidden width={16} fill={10} hoverFill={11} />
            ) : (
              <Components.EyeVisible width={16} fill={10} hoverFill={11} />
            )}
          </button>
        )}
      </div>
    </article>
  );
};
