import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Filter = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_614_434)">
        <path d="M0 20C0 20.7333 0.6 21.3333 1.33333 21.3333H8V18.6667H1.33333C0.6 18.6667 0 19.2667 0 20ZM0 4C0 4.73333 0.6 5.33333 1.33333 5.33333H13.3333V2.66667H1.33333C0.6 2.66667 0 3.26667 0 4ZM13.3333 22.6667V21.3333H22.6667C23.4 21.3333 24 20.7333 24 20C24 19.2667 23.4 18.6667 22.6667 18.6667H13.3333V17.3333C13.3333 16.6 12.7333 16 12 16C11.2667 16 10.6667 16.6 10.6667 17.3333V22.6667C10.6667 23.4 11.2667 24 12 24C12.7333 24 13.3333 23.4 13.3333 22.6667ZM5.33333 9.33333V10.6667H1.33333C0.6 10.6667 0 11.2667 0 12C0 12.7333 0.6 13.3333 1.33333 13.3333H5.33333V14.6667C5.33333 15.4 5.93333 16 6.66667 16C7.4 16 8 15.4 8 14.6667V9.33333C8 8.6 7.4 8 6.66667 8C5.93333 8 5.33333 8.6 5.33333 9.33333ZM24 12C24 11.2667 23.4 10.6667 22.6667 10.6667H10.6667V13.3333H22.6667C23.4 13.3333 24 12.7333 24 12ZM17.3333 8C18.0667 8 18.6667 7.4 18.6667 6.66667V5.33333H22.6667C23.4 5.33333 24 4.73333 24 4C24 3.26667 23.4 2.66667 22.6667 2.66667H18.6667V1.33333C18.6667 0.6 18.0667 0 17.3333 0C16.6 0 16 0.6 16 1.33333V6.66667C16 7.4 16.6 8 17.3333 8Z" />
      </g>
    </svg>
  );
};
