import { Signal, useSignal } from "@preact/signals-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input-auth.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const initial = { opacity: 0 };
const animate = { opacity: 1 };
const exit = { opacity: 0 };
const transition = { duration: 0.2, delay: 0 };

type Props = {
  type: Types.UserInputType;
  placeholder: string;
  userInput: Signal<string>;
  errorMessage: string;
  password?: true;
};

export const InputAuth = (props: Props) => {
  const inputType = useSignal(props.type);
  const inputRef = useRef<any>(null);

  function focusInput(): void {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }

  function userInputIsValid(): boolean {
    return !props.errorMessage && props.userInput.value.length > 0;
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
				${props.errorMessage && Styles.error}
				${Helpers.setBackgroundLevel(2)}
				${Helpers.setClickLevel(2)}
				${Helpers.setHoverLevel(2)}
			`}
      onClick={focusInput}
    >
      <AnimatePresence>
        {(props.userInput.value.length > 0 || props.errorMessage) && (
          <section className={Styles.placeholderAndError}>
            {props.userInput.value.length > 0 && (
              <motion.p
                key="Placeholder"
                className={Styles.placeholder}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
              >
                {props.placeholder}
              </motion.p>
            )}
            {props.errorMessage && (
              <motion.p
                key="Error Message"
                className={Styles.error}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
              >
                {props.errorMessage}
              </motion.p>
            )}
          </section>
        )}
      </AnimatePresence>

      <section className={Styles.inputContainer}>
        <AnimatePresence>
          {userInputIsValid() && (
            <motion.button
              key="User Input Is Valid"
              className={Snippets.iconButton}
              onClick={togglePasswordInput}
              type="button"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
            >
              <Components.CheckRounded width={16} fill={11} />
            </motion.button>
          )}
        </AnimatePresence>

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
