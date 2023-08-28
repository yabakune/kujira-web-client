import * as Helpers from "@/helpers";

import Styles from "./shimmer.module.scss";

type Props = {
  width?: string;
  height?: string;
  borderRadius?: number;
};

export const Shimmer = (props: Props) => {
  return (
    <div
      className={Styles.container}
      style={{
        width: props.width || "100%",
        height: props.height || "100%",
        borderRadius: Helpers.setBorderRadius(props.borderRadius),
      }}
    />
  );
};
