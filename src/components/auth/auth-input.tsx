import { Signal, useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./auth-input.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  type: Types.UserInputType;
  placeholder: string;
  userInput: Signal<string>;
  errorMessage: Signal<string>;
  password?: true;
};

export const AuthInput = (props: Props) => {
  const inputType = useSignal(props.type);
  const inputRef = useRef<any>(null);

  function focusInput(): void {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }

  function userInputIsValid(): boolean {
    return !props.errorMessage.value && props.userInput.value.length > 0;
  }

  function setUserInput(event: Types.OnChange): void {
    const userInput = event.currentTarget.value;
    props.userInput.value = userInput;
  }

  function togglePasswordInput(event: Types.OnClick<HTMLButtonElement>): void {
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
				${props.errorMessage.value && Styles.error}
				${Helpers.setBackgroundLevel(2)}
				${Helpers.setClickLevel(2)}
				${Helpers.setHoverLevel(2)}
			`}
      onClick={focusInput}
    >
      {(props.userInput.value.length > 0 || props.errorMessage.value) && (
        <section className={Styles.placeholderAndError}>
          {props.userInput.value.length > 0 && (
            <p key="Placeholder" className={Styles.placeholder}>
              {props.placeholder}
            </p>
          )}
          {props.errorMessage.value && (
            <p key="Error Message" className={Styles.error}>
              {props.errorMessage.value}
            </p>
          )}
        </section>
      )}

      <section className={Styles.inputContainer}>
        {userInputIsValid() && (
          <button
            key="User Input Is Valid"
            className={Snippets.iconButton}
            onClick={togglePasswordInput}
            type="button"
            tabIndex={-1}
          >
            <Components.CheckRounded width={16} fill={11} />
          </button>
        )}

        <input
          className={Styles.input}
          type={inputType.value}
          placeholder={props.placeholder}
          value={props.userInput.value}
          ref={inputRef}
          onChange={setUserInput}
          required
        />

        {props.password && (
          <button
            className={Snippets.iconButton}
            onClick={togglePasswordInput}
            type="button"
            tabIndex={-1}
          >
            {inputType.value === "password" ? (
              <Components.EyeHidden width={16} fill={10} hoverFill={11} />
            ) : (
              <Components.EyeVisible width={16} fill={10} hoverFill={11} />
            )}
          </button>
        )}
      </section>
    </article>
  );
};
