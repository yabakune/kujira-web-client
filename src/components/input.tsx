import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  setValue: (event: Types.OnChange) => void;
  borderRadius?: number;
  backgroundLevel?: number;
};

export const Input = (props: Props) => {
  return (
    <article
      className={`
        ${Styles.article}
        ${Helpers.setBackgroundLevel(props.backgroundLevel || 1)}
        ${Helpers.setHoverLevel(props.backgroundLevel || 1)}
      `}
      style={{
        borderRadius: Helpers.setBorderRadius(props.borderRadius),
      }}
    >
      <input
        className={Styles.input}
        onChange={props.setValue}
        value={props.value}
        placeholder={props.placeholder}
      />
    </article>
  );
};
