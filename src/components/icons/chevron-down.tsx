import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const ChevronDown = (props: Types.IconProps) => {
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
      <g clip-path="url(#clip0_711_42)">
        <path d="M0.470023 5.60284C-0.156674 6.22954 -0.156674 7.23993 0.470023 7.86663L11.0983 18.4949C11.5971 18.9937 12.4029 18.9937 12.9017 18.4949L23.53 7.86663C24.1567 7.23993 24.1567 6.22954 23.53 5.60284C22.9033 4.97614 21.8929 4.97614 21.2662 5.60284L11.9936 14.8626L2.72102 5.59005C2.10711 4.97614 1.08393 4.97614 0.470023 5.60284Z" />
      </g>
    </svg>
  );
};
