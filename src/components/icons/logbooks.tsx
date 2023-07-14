import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Logbooks = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_7_20)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.56 0H1.44C0.64471 0 0 0.64471 0 1.44V4.32C0 5.11529 0.64471 5.76 1.44 5.76H22.56C23.3553 5.76 24 5.11529 24 4.32V1.44C24 0.64471 23.3553 0 22.56 0ZM22.56 9.12H1.44C0.64471 9.12 0 9.76471 0 10.56V13.44C0 14.2353 0.64471 14.88 1.44 14.88H22.56C23.3553 14.88 24 14.2353 24 13.44V10.56C24 9.76471 23.3553 9.12 22.56 9.12ZM1.44 18.24H22.56C23.3553 18.24 24 18.8847 24 19.68V22.56C24 23.3553 23.3553 24 22.56 24H1.44C0.64471 24 0 23.3553 0 22.56V19.68C0 18.8847 0.64471 18.24 1.44 18.24Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_7_20">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
