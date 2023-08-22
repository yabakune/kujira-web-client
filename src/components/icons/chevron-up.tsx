import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const ChevronUp = (props: Types.IconProps) => {
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
      <g clip-path="url(#clip0_711_39)">
        <path d="M23.53 18.3974C24.1568 17.7707 24.1568 16.7603 23.53 16.1336L12.9017 5.5053C12.4029 5.0065 11.5971 5.0065 11.0983 5.5053L0.470024 16.1336C-0.156675 16.7603 -0.156675 17.7707 0.470024 18.3974C1.09672 19.0241 2.10711 19.0241 2.73381 18.3974L12.0064 9.13759L21.279 18.4102C21.8929 19.0241 22.9161 19.0241 23.53 18.3974Z" />
      </g>
    </svg>
  );
};
