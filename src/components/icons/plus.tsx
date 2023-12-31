import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Plus = (props: Types.IconProps) => {
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
      <g clipPath="url(#clip0_617_7)">
        <path d="M22.2857 13.7143H13.7143V22.2857C13.7143 23.2286 12.9429 24 12 24C11.0571 24 10.2857 23.2286 10.2857 22.2857V13.7143H1.71429C0.771429 13.7143 0 12.9429 0 12C0 11.0571 0.771429 10.2857 1.71429 10.2857H10.2857V1.71429C10.2857 0.771429 11.0571 0 12 0C12.9429 0 13.7143 0.771429 13.7143 1.71429V10.2857H22.2857C23.2286 10.2857 24 11.0571 24 12C24 12.9429 23.2286 13.7143 22.2857 13.7143Z" />
      </g>
    </svg>
  );
};
