import * as Hooks from "@/hooks";

type Props = {
  children: React.ReactNode;
};

export const AuthorizationLayout = (props: Props) => {
  return <>{props.children}Authorization Layout</>;
};
