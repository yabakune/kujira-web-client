import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Reviews = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_621_2)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.3333 21.3333V2.66666H2.66666V21.3333H21.3333ZM2.66666 0H21.3333C22.8 0 24 1.2 24 2.66666V21.3333C24 22.8 22.8 24 21.3333 24H2.66666C1.2 24 0 22.8 0 21.3333V2.66666C0 1.2 1.2 0 2.66666 0ZM5.33345 18.6667H14.6668V16H5.33345V18.6667ZM5.33345 13.3333H18.6668V10.6667H5.33345V13.3333ZM5.33345 7.99999H18.6668V5.33333H5.33345V7.99999Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_621_2">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
