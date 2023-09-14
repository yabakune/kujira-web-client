import Styles from "./progress-bar.module.scss";

type Props = {
  height?: number;
  progression: number;
  defaultProgression?: true;
  reverseProgression?: true;
};

function determineProgression(progression: number): string {
  if (progression <= 25) return Styles.low;
  else if (progression <= 50) return Styles.moderate;
  else if (progression <= 75) return Styles.high;
  else return Styles.excellent;
}

function determineProgressionReverse(progression: number): string {
  if (progression <= 25) return Styles.excellent;
  else if (progression <= 50) return Styles.high;
  else if (progression <= 75) return Styles.moderate;
  else return Styles.low;
}

export const ProgressBar = (props: Props) => {
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
					${
            props.defaultProgression
              ? Styles.default
              : props.reverseProgression
              ? determineProgressionReverse(props.progression)
              : determineProgression(props.progression)
          }
				`}
        style={{ width: `${props.progression}%` }}
      />
    </section>
  );
};
