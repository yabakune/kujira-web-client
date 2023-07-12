import * as Types from "@/types";

export function preventBubbling<HTMLElement>(
  event: Types.OnClick<HTMLElement>
): void {
  event.stopPropagation();
}
