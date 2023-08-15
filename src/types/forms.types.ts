export type UserInputType = "text" | "email" | "password";

export type OnChange = React.FormEvent<HTMLInputElement>;

export type OnSubmit = React.FormEvent<HTMLFormElement>;

export type OnClick<HTMLElement> = React.MouseEvent<HTMLElement>;
