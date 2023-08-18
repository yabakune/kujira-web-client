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
  backgroundLevel?: number;
  password?: true;
  required?: true;
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
    <article className={Styles.container}>
      {props.errorMessage.value && (
        <p className={Styles.error}>{props.errorMessage.value}</p>
      )}

      <div
        className={`
					${Styles.inputContainer}
          ${props.errorMessage.value && Styles.error}
          ${Helpers.setBackgroundClickHover(props.backgroundLevel)}
				`}
        onClick={focusInput}
      >
        <input
          className={Styles.input}
          type={inputType.value}
          placeholder={props.placeholder}
          value={props.userInput.value}
          ref={inputRef}
          onChange={setUserInput}
          required={props.required}
        />

        {props.password && (
          <button
            aria-label="Password Input Type Toggle Button"
            className={Snippets.iconButton}
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
