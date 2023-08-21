import { useSignal } from "@preact/signals-react";

import * as Helpers from "@/helpers";
import * as Types from "@/types";

export const USD = (props: Types.IconProps) => {
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
      <path d="M12.3994 10.5333C9.37276 9.74667 8.39943 8.93333 8.39943 7.66667C8.39943 6.21333 9.7461 5.2 11.9994 5.2C13.8928 5.2 14.8394 5.92 15.1861 7.06667C15.3461 7.6 15.7861 8 16.3461 8H16.7461C17.6261 8 18.2528 7.13333 17.9461 6.30667C17.3861 4.73333 16.0794 3.42667 13.9994 2.92V2C13.9994 0.893333 13.1061 0 11.9994 0C10.8928 0 9.99943 0.893333 9.99943 2V2.88C7.41276 3.44 5.33276 5.12 5.33276 7.69333C5.33276 10.7733 7.87943 12.3067 11.5994 13.2C14.9328 14 15.5994 15.1733 15.5994 16.4133C15.5994 17.3333 14.9461 18.8 11.9994 18.8C9.79943 18.8 8.6661 18.0133 8.2261 16.8933C8.0261 16.3733 7.57276 16 7.0261 16H6.65276C5.75943 16 5.13276 16.9067 5.4661 17.7333C6.2261 19.5867 7.99943 20.68 9.99943 21.1067V22C9.99943 23.1067 10.8928 24 11.9994 24C13.1061 24 13.9994 23.1067 13.9994 22V21.1333C16.5994 20.64 18.6661 19.1333 18.6661 16.4C18.6661 12.6133 15.4261 11.32 12.3994 10.5333Z" />
    </svg>
  );
};
