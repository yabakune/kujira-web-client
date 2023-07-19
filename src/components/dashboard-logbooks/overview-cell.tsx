import Styles from "./overview-cell.module.scss";

import * as Components from "@/components";

type Props = {
  label: string;
  value: number | JSX.Element;
};

export const OverviewCell = (props: Props) => {
  return (
    <div className={Styles.container}>
      <span>{props.label}</span>
      <div>{props.value}</div>
    </div>
  );
};
