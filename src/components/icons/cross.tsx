import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Cross = (props: Types.IconProps) => {
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
      <g clip-path="url(#clip0_614_439)">
        <path d="M23.4676 0.550626C22.7577 -0.159271 21.6109 -0.159271 20.901 0.550626L12 9.43345L3.09898 0.532423C2.38908 -0.177474 1.24232 -0.177474 0.532423 0.532423C-0.177474 1.24232 -0.177474 2.38908 0.532423 3.09898L9.43345 12L0.532423 20.901C-0.177474 21.6109 -0.177474 22.7577 0.532423 23.4676C1.24232 24.1775 2.38908 24.1775 3.09898 23.4676L12 14.5666L20.901 23.4676C21.6109 24.1775 22.7577 24.1775 23.4676 23.4676C24.1775 22.7577 24.1775 21.6109 23.4676 20.901L14.5666 12L23.4676 3.09898C24.1593 2.40728 24.1593 1.24232 23.4676 0.550626Z" />
      </g>
      <defs>
        <clipPath id="clip0_614_439">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
