import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Drag = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_618_9)">
        <path d="M10.5 21C10.5 22.65 9.15 24 7.5 24C5.85 24 4.5 22.65 4.5 21C4.5 19.35 5.85 18 7.5 18C9.15 18 10.5 19.35 10.5 21ZM7.5 9C5.85 9 4.5 10.35 4.5 12C4.5 13.65 5.85 15 7.5 15C9.15 15 10.5 13.65 10.5 12C10.5 10.35 9.15 9 7.5 9ZM7.5 0C5.85 0 4.5 1.35 4.5 3C4.5 4.65 5.85 6 7.5 6C9.15 6 10.5 4.65 10.5 3C10.5 1.35 9.15 0 7.5 0ZM16.5 6C18.15 6 19.5 4.65 19.5 3C19.5 1.35 18.15 0 16.5 0C14.85 0 13.5 1.35 13.5 3C13.5 4.65 14.85 6 16.5 6ZM16.5 9C14.85 9 13.5 10.35 13.5 12C13.5 13.65 14.85 15 16.5 15C18.15 15 19.5 13.65 19.5 12C19.5 10.35 18.15 9 16.5 9ZM16.5 18C14.85 18 13.5 19.35 13.5 21C13.5 22.65 14.85 24 16.5 24C18.15 24 19.5 22.65 19.5 21C19.5 19.35 18.15 18 16.5 18Z" />
      </g>
      <defs>
        <clipPath id="clip0_618_9">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
