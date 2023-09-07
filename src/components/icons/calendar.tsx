import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Calendar = (props: Types.IconProps) => {
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
      <path d="M20.4 2.4H19.2V0H16.8V2.4H7.20001V0H4.80001V2.4H3.60001C2.26801 2.4 1.21201 3.48 1.21201 4.8L1.20001 21.6C1.20001 22.92 2.26801 24 3.60001 24H20.4C21.72 24 22.8 22.92 22.8 21.6V4.8C22.8 3.48 21.72 2.4 20.4 2.4ZM20.4 21.6H3.60001V9.6H20.4V21.6ZM20.4 7.2H3.60001V4.8H20.4V7.2ZM8.40001 14.4H6.00001V12H8.40001V14.4ZM13.2 14.4H10.8V12H13.2V14.4ZM18 14.4H15.6V12H18V14.4ZM8.40001 19.2H6.00001V16.8H8.40001V19.2ZM13.2 19.2H10.8V16.8H13.2V19.2ZM18 19.2H15.6V16.8H18V19.2Z" />
    </svg>
  );
};
