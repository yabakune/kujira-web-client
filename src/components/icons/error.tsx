import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Error = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_1219_428)">
        <path d="M14.268 8.04L12 10.308L9.732 8.04C9.264 7.572 8.508 7.572 8.04 8.04C7.572 8.508 7.572 9.264 8.04 9.732L10.308 12L8.04 14.268C7.572 14.736 7.572 15.492 8.04 15.96C8.508 16.428 9.264 16.428 9.732 15.96L12 13.692L14.268 15.96C14.736 16.428 15.492 16.428 15.96 15.96C16.428 15.492 16.428 14.736 15.96 14.268L13.692 12L15.96 9.732C16.428 9.264 16.428 8.508 15.96 8.04C15.492 7.584 14.724 7.584 14.268 8.04ZM12 0C5.364 0 0 5.364 0 12C0 18.636 5.364 24 12 24C18.636 24 24 18.636 24 12C24 5.364 18.636 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 17.292 17.292 21.6 12 21.6Z" />
      </g>
    </svg>
  );
};
