import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const CheckboxActive = (props: Types.IconProps) => {
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
      <g clip-path="url(#clip0_614_437)">
        <path d="M21.3333 0H2.66667C1.2 0 0 1.2 0 2.66667V21.3333C0 22.8 1.2 24 2.66667 24H21.3333C22.8 24 24 22.8 24 21.3333V2.66667C24 1.2 22.8 0 21.3333 0ZM21.3333 21.3333H2.66667V2.66667H21.3333V21.3333ZM19.9867 8L18.1067 6.10667L9.32 14.8933L5.88 11.4667L3.98667 13.3467L9.32 18.6667L19.9867 8Z" />
      </g>
      <defs>
        <clipPath id="clip0_614_437">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
