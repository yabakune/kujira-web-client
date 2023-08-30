import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Overview = (props: Types.IconProps) => {
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
      <path d="M10.6667 1.33319H24V3.99986H10.6667V1.33319ZM10.6667 6.66652H18.6667V9.33319H10.6667V6.66652ZM10.6667 14.6665H24V17.3332H10.6667V14.6665ZM10.6667 19.9999H18.6667V22.6665H10.6667V19.9999ZM0 1.33319H8V9.33319H0V1.33319ZM2.66667 3.99986V6.66652H5.33333V3.99986H2.66667ZM0 14.6665H8V22.6665H0V14.6665ZM2.66667 17.3332V19.9999H5.33333V17.3332H2.66667Z" />
    </svg>
  );
};
