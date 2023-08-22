import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Pending = (props: Types.IconProps) => {
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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.6 12C21.6 17.3019 17.3019 21.6 12 21.6C6.69807 21.6 2.4 17.3019 2.4 12C2.4 6.69807 6.69807 2.4 12 2.4C17.3019 2.4 21.6 6.69807 21.6 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM6 12C6 11.175 6.675 10.5 7.5 10.5C8.325 10.5 9 11.175 9 12C9 12.825 8.325 13.5 7.5 13.5C6.675 13.5 6 12.825 6 12ZM15 12C15 11.175 15.675 10.5 16.5 10.5C17.325 10.5 18 11.175 18 12C18 12.825 17.325 13.5 16.5 13.5C15.675 13.5 15 12.825 15 12ZM10.5 12C10.5 11.175 11.175 10.5 12 10.5C12.825 10.5 13.5 11.175 13.5 12C13.5 12.825 12.825 13.5 12 13.5C11.175 13.5 10.5 12.825 10.5 12Z"
      />
    </svg>
  );
};
