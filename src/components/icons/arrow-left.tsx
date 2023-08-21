import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const ArrowLeft = (props: Types.IconProps) => {
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
      <g clip-path="url(#clip0_614_419)">
        <path d="M22.4598 10.4681H5.2559L12.772 2.95198C13.3727 2.35131 13.3727 1.36559 12.772 0.764913C12.1713 0.164239 11.201 0.164239 10.6004 0.764913L0.450505 10.9148C-0.150168 11.5154 -0.150168 12.4858 0.450505 13.0864L10.6004 23.2363C11.201 23.837 12.1713 23.837 12.772 23.2363C13.3727 22.6356 13.3727 21.6653 12.772 21.0646L5.2559 13.5485H22.4598C23.3069 13.5485 24 12.8554 24 12.0083C24 11.1612 23.3069 10.4681 22.4598 10.4681Z" />
      </g>
    </svg>
  );
};
