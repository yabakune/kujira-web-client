import Styles from "./progress-bar.module.scss";

type Props = {
  height?: number;
  progression: number;
  defaultProgression?: true;
};

export const ProgressBar = (props: Props) => {
  function determineProgression(): string {
    if (props.defaultProgression) {
      return Styles.default;
    } else {
      if (props.progression <= 25) return Styles.low;
      else if (props.progression <= 50) return Styles.moderate;
      else if (props.progression <= 75) return Styles.high;
      else return Styles.excellent;
    }
  }

  return (
    <section
      className={Styles.container}
      style={{
        height: props.height ? `${props.height}px` : "4px",
      }}
    >
      <div
        className={`
					${Styles.progression}
					${determineProgression()}
				`}
        style={{ width: `${props.progression}%` }}
      />
    </section>
  );
};
