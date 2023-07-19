import Styles from "./overview-cell.module.scss";

import * as Components from "@/components";

type Props = {
  label: string;
  children: React.ReactNode;
};

export const OverviewCell = (props: Props) => {
  return (
    <div className={Styles.container}>
      <span>{props.label}</span>
      {props.children}
    </div>
  );
};
