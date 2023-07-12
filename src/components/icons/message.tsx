import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Message = (props: Types.IconProps) => {
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
      onMouseEnter={() => props.addHover && (hovered.value = true)}
      onMouseLeave={() => props.addHover && (hovered.value = false)}
    >
      <path d="M24 4.79999C24 3.47999 22.92 2.39999 21.6 2.39999H2.4C1.08 2.39999 0 3.47999 0 4.79999V19.2C0 20.52 1.08 21.6 2.4 21.6H21.6C22.92 21.6 24 20.52 24 19.2V4.79999ZM21.6 4.79999L12 10.8L2.4 4.79999H21.6ZM21.6 19.2H2.4V7.19999L12 13.2L21.6 7.19999V19.2Z" />
    </svg>
  );
};
