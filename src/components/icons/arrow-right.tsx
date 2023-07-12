import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const ArrowRight = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_614_410)">
        <path d="M1.54019 13.5331H18.7441L11.228 21.0492C10.6273 21.6499 10.6273 22.6356 11.228 23.2363C11.8286 23.837 12.799 23.837 13.3996 23.2363L23.5495 13.0864C24.1503 12.4857 24.1503 11.5154 23.5495 10.9148L13.3996 0.764913C12.799 0.164239 11.8286 0.164239 11.228 0.764913C10.6273 1.36559 10.6273 2.33591 11.228 2.93658L18.7441 10.4527H1.54019C0.693084 10.4527 0 11.1458 0 11.9929C0 12.84 0.693084 13.5331 1.54019 13.5331Z" />
      </g>
      <defs>
        <clipPath id="clip0_614_410">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
