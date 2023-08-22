import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Success = (props: Types.IconProps) => {
  const hovered = useSignal(false);

  return (
    <svg
      className={
        hovered.value
          ? Helpers.setIconFill(props.hoverFill)
          : Helpers.setIconFill(props.fill)
      }
      width={props.width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => props.hoverFill && (hovered.value = true)}
      onMouseLeave={() => props.hoverFill && (hovered.value = false)}
    >
      <g clip-path="url(#clip0_1354_58)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.4 12C2.4 6.69808 6.698 2.4 12 2.4C17.302 2.4 21.6 6.69808 21.6 12C21.6 17.302 17.302 21.6 12 21.6C6.698 21.6 2.4 17.302 2.4 12ZM12 0C5.3726 0 0 5.37257 0 12C0 18.6275 5.3726 24 12 24C18.6274 24 24 18.6275 24 12C24 5.37257 18.6274 0 12 0ZM16.4486 10.4485C16.9172 9.97991 16.9172 9.22009 16.4486 8.75149C15.9798 8.28284 15.2202 8.28284 14.7514 8.75149L10.8 12.703L9.24858 11.1515C8.77984 10.6828 8.02016 10.6828 7.55142 11.1515C7.08281 11.6201 7.08281 12.3799 7.55142 12.8485L9.95142 15.2485C10.4202 15.7171 11.1798 15.7171 11.6486 15.2485L16.4486 10.4485Z"
        />
      </g>
    </svg>
  );
};
