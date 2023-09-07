import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Wallet = (props: Types.IconProps) => {
  const hovered = useSignal(false);

  return (
    <svg
      className={
        hovered.value
          ? Helpers.setIconFill(props.hoverFill)
          : Helpers.setIconFill(props.fill)
      }
      width={props.width}
      height={props.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => props.hoverFill && (hovered.value = true)}
      onMouseLeave={() => props.hoverFill && (hovered.value = false)}
    >
      <path d="M21.6 2.39999H2.4C1.068 2.39999 0.012 3.46799 0.012 4.79999L0 19.2C0 20.532 1.068 21.6 2.4 21.6H21.6C22.932 21.6 24 20.532 24 19.2V4.79999C24 3.46799 22.932 2.39999 21.6 2.39999ZM21.6 19.2H2.4V12H21.6V19.2ZM21.6 7.19999H2.4V4.79999H21.6V7.19999Z" />
    </svg>
  );
};
