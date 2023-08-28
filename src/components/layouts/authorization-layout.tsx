import * as Hooks from "@/hooks";

type Props = {
  children: React.ReactNode;
};

export const AuthorizationLayout = (props: Props) => {
  Hooks.useAuthorization();

  return <>{props.children}Authorization Layout</>;
};
