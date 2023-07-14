import * as Types from "@/types";

export function preventBubbling<HTMLElement>(
  event: Types.OnClick<HTMLElement>
): void {
  event.stopPropagation();
}

export function checkValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9_.-]*[a-zA-Z0-9])?$/.test(username);
}

export function checkValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%#]).*$/.test(password);
}
