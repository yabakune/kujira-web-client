import * as Types from "@/types";

import Styles from "./input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  setValue: (event: Types.OnChange) => void;
};

export const Input = (props: Props) => {
  <article className={Styles.article}>
    <input
      onChange={props.setValue}
      value={props.value}
      placeholder={props.placeholder}
    />
  </article>;
};
