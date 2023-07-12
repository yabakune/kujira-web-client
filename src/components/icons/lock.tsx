import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const Lock = (props: Types.IconProps) => {
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
      <path d="M20.5709 7.71429H17.5709V5.57143C17.5709 4.09379 16.9839 2.67668 15.9391 1.63183C14.8942 0.586988 13.4771 0 11.9995 0C10.5218 0 9.10472 0.586988 8.05988 1.63183C7.01503 2.67668 6.42804 4.09379 6.42804 5.57143V7.71429H3.42804C2.85972 7.71429 2.31468 7.94005 1.91282 8.34191C1.51095 8.74378 1.28519 9.28882 1.28519 9.85714V21.8571C1.28519 22.4255 1.51095 22.9705 1.91282 23.3724C2.31468 23.7742 2.85972 24 3.42804 24H20.5709C21.1392 24 21.6843 23.7742 22.0861 23.3724C22.488 22.9705 22.7138 22.4255 22.7138 21.8571V9.85714C22.7138 9.28882 22.488 8.74378 22.0861 8.34191C21.6843 7.94005 21.1392 7.71429 20.5709 7.71429ZM8.99947 5.57143C8.99947 4.77578 9.31554 4.01272 9.87815 3.45011C10.4408 2.8875 11.2038 2.57143 11.9995 2.57143C12.7951 2.57143 13.5582 2.8875 14.1208 3.45011C14.6834 4.01272 14.9995 4.77578 14.9995 5.57143V7.71429H8.99947V5.57143ZM20.1423 21.4286H3.85662V10.2857H20.1423V21.4286ZM13.7138 15.8571C13.7138 16.1962 13.6132 16.5276 13.4248 16.8095C13.2365 17.0915 12.9687 17.3112 12.6555 17.4409C12.3423 17.5707 11.9976 17.6046 11.665 17.5385C11.3325 17.4723 11.027 17.3091 10.7873 17.0693C10.5475 16.8296 10.3843 16.5241 10.3181 16.1916C10.252 15.859 10.2859 15.5144 10.4157 15.2011C10.5454 14.8879 10.7652 14.6201 11.0471 14.4318C11.329 14.2434 11.6604 14.1429 11.9995 14.1429C12.4541 14.1429 12.8902 14.3235 13.2117 14.645C13.5331 14.9665 13.7138 15.4025 13.7138 15.8571Z" />
    </svg>
  );
};
