import * as Types from "@/types";

export function preventBubbling<HTMLElement>(
  event: Types.OnClick<HTMLElement>
): void {
  event.stopPropagation();
}

export function checkValidUsername(username: string): boolean {
  // Can only start and end with a letter or number.
  // Can only contain these special characters : ., _, -
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9_.-]*[a-zA-Z0-9])?$/.test(username);
}

export function checkValidPassword(password: string): boolean {
  // Must contain at least one capital letter, one lowercase letter,
  // one number, and one of the following special characters : !, @, #, $, %, &
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@%#]).*$/.test(password);
}

export function checkValidLogbookEntryInput(name: string): boolean {
  // Must follow the following format : MM/DD/YYYY
  return /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(name);
}

export function checkValidLogbookEntryFormattedName(name: string): boolean {
  const date = new Date(name);
  return !!date.getFullYear();
}
