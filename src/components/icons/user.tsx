import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const User = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_614_438)">
        <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM6.42 19.8C7.992 18.672 9.912 18 12 18C14.088 18 16.008 18.672 17.58 19.8C16.008 20.928 14.088 21.6 12 21.6C9.912 21.6 7.992 20.928 6.42 19.8ZM19.368 18.144C17.34 16.56 14.784 15.6 12 15.6C9.216 15.6 6.66 16.56 4.632 18.144C3.24 16.476 2.4 14.34 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 14.34 20.76 16.476 19.368 18.144Z" />
        <path d="M12 4.8C9.684 4.8 7.8 6.684 7.8 9C7.8 11.316 9.684 13.2 12 13.2C14.316 13.2 16.2 11.316 16.2 9C16.2 6.684 14.316 4.8 12 4.8ZM12 10.8C11.004 10.8 10.2 9.996 10.2 9C10.2 8.004 11.004 7.2 12 7.2C12.996 7.2 13.8 8.004 13.8 9C13.8 9.996 12.996 10.8 12 10.8Z" />
      </g>
      <defs>
        <clipPath id="clip0_614_438">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
