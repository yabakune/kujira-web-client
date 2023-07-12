import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const EyeVisible = (props: Types.IconProps) => {
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
      <path d="M12 6.00183C16.1345 6.00183 19.8218 8.32546 21.6218 12.0018C19.8218 15.6782 16.1345 18.0018 12 18.0018C7.86545 18.0018 4.17818 15.6782 2.37818 12.0018C4.17818 8.32546 7.86545 6.00183 12 6.00183ZM12 3.82001C6.54545 3.82001 1.88727 7.21273 0 12.0018C1.88727 16.7909 6.54545 20.1836 12 20.1836C17.4545 20.1836 22.1127 16.7909 24 12.0018C22.1127 7.21273 17.4545 3.82001 12 3.82001ZM12 9.27455C13.5055 9.27455 14.7273 10.4964 14.7273 12.0018C14.7273 13.5073 13.5055 14.7291 12 14.7291C10.4945 14.7291 9.27273 13.5073 9.27273 12.0018C9.27273 10.4964 10.4945 9.27455 12 9.27455ZM12 7.09273C9.29455 7.09273 7.09091 9.29637 7.09091 12.0018C7.09091 14.7073 9.29455 16.9109 12 16.9109C14.7055 16.9109 16.9091 14.7073 16.9091 12.0018C16.9091 9.29637 14.7055 7.09273 12 7.09273Z" />
    </svg>
  );
};
