import Styles from "./input.module.scss";

type Props = {
  value: string;
  placeholder: string;
  setValue: () => void;
};

export const Input = (props: Props) => {
  <article className={Styles.article}>
    <input value={props.value} placeholder={props.placeholder} />
  </article>;
};
