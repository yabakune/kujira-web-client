import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Text = (props: Types.IconProps) => {
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
      <path d="M0 4.42074C0 5.46916 0.846316 6.31547 1.89474 6.31547H6.31579V19.5786C6.31579 20.6271 7.16211 21.4734 8.21053 21.4734C9.25895 21.4734 10.1053 20.6271 10.1053 19.5786V6.31547H14.5263C15.5747 6.31547 16.4211 5.46916 16.4211 4.42074C16.4211 3.37232 15.5747 2.526 14.5263 2.526H1.89474C0.846316 2.526 0 3.37232 0 4.42074ZM22.1053 8.84179H14.5263C13.4779 8.84179 12.6316 9.68811 12.6316 10.7365C12.6316 11.7849 13.4779 12.6313 14.5263 12.6313H16.4211V19.5786C16.4211 20.6271 17.2674 21.4734 18.3158 21.4734C19.3642 21.4734 20.2105 20.6271 20.2105 19.5786V12.6313H22.1053C23.1537 12.6313 24 11.7849 24 10.7365C24 9.68811 23.1537 8.84179 22.1053 8.84179Z" />
    </svg>
  );
};
