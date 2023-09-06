import Styles from "./cached-display.module.scss";

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export const CachedDisplay = (props: Props) => {
  return (
    <div
      className={`
      ${Styles.display}
      ${props.show ? Styles.show : Styles.hide}
    `}
    >
      {props.children}
    </div>
  );
};
