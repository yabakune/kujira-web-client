import { useSignal } from "@preact/signals-react";
import { useRef } from "react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  setValue: (event: Types.OnChange) => void;
  borderRadius?: number;
  backgroundLevel?: number;
};

export const Input = (props: Props) => {
  const articleRef = useRef<any>(null);
  const focused = useSignal(false);

  function setFocused(state: boolean): void {
    focused.value = state;
  }

  console.log("active.value:", focused.value);

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
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <input
        className={Styles.input}
        onChange={props.setValue}
        value={props.value}
        placeholder={props.placeholder}
      />
    </article>
  );
};
