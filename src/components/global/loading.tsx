import Styles from "./loading.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Props = {
  text?: string;
  transparentBackground?: true;
};

export const Loading = (props: Props) => {
  return (
    <div
      className={`
				${Styles.container}
				${props.transparentBackground && Styles.transparent}
			`}
    >
      <div className={Styles.spinner}>
        <div className={`${Styles.ring} ${Styles.ringOne}`} />
        <div className={`${Styles.ring} ${Styles.ringTwo}`} />
        <div className={`${Styles.ring} ${Styles.ringThree}`} />
      </div>
      {props.text && <p className={Snippets.semiTitleText}>{props.text}</p>}
    </div>
  );
};
