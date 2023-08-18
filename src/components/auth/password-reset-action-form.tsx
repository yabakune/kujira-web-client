import { Signal } from "@preact/signals-react";

type Props = {
  email: Signal<string>;
  emailError: Signal<string>;
};

export const PasswordResetActionForm = (props: Props) => {
  return <form>password reset action form</form>;
};
