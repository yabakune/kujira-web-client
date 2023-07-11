import * as Helpers from "@/helpers";
import * as Types from "@/types";

import Styles from "./input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  setValue: (event: Types.OnChange) => void;
  borderRadius?: number;
};

export const Input = (props: Props) => {
  <article
    className={Styles.article}
    style={{ borderRadius: Helpers.setBorderRadius(props.borderRadius) }}
  >
    <input
      onChange={props.setValue}
      value={props.value}
      placeholder={props.placeholder}
    />
  </article>;
};
