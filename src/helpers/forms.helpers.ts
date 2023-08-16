import * as Types from "@/types";

export function preventBubbling<HTMLElement>(
  event: Types.OnClick<HTMLElement>
): void {
  event.stopPropagation();
}

export function checkValidUsername(username: string): boolean {
  // Can only start and end with a letter or number.
  // Can only contain these special characters: ., _, -
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9_.-]*[a-zA-Z0-9])?$/.test(username);
}

export function checkValidPassword(password: string): boolean {
  // Must contain at least one capital letter, one lowercase letter,
  // one number, and one of the following special characters: !, @, #, $, %, &
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%#]).*$/.test(password);
}
