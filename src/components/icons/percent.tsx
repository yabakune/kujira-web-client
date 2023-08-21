import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Percent = (props: Types.IconProps) => {
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
      <path d="M5.25 0C2.355 0 0 2.355 0 5.25C0 8.145 2.355 10.5 5.25 10.5C8.145 10.5 10.5 8.145 10.5 5.25C10.5 2.355 8.145 0 5.25 0ZM5.25 7.5C4.005 7.5 3 6.495 3 5.25C3 4.005 4.005 3 5.25 3C6.495 3 7.5 4.005 7.5 5.25C7.5 6.495 6.495 7.5 5.25 7.5ZM18.75 13.5C15.855 13.5 13.5 15.855 13.5 18.75C13.5 21.645 15.855 24 18.75 24C21.645 24 24 21.645 24 18.75C24 15.855 21.645 13.5 18.75 13.5ZM18.75 21C17.505 21 16.5 19.995 16.5 18.75C16.5 17.505 17.505 16.5 18.75 16.5C19.995 16.5 21 17.505 21 18.75C21 19.995 19.995 21 18.75 21ZM22.935 1.065C23.52 1.65 23.52 2.595 22.935 3.18L3.18 22.935C2.595 23.52 1.65 23.52 1.065 22.935C0.48 22.35 0.48 21.405 1.065 20.82L20.82 1.065C21.405 0.48 22.35 0.48 22.935 1.065Z" />
    </svg>
  );
};
