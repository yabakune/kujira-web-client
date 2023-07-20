type Props = {
  width: number;
  show: boolean;
};

export const Spacer = (props: Props) => {
  return (
    <div
      style={{
        display: props.show ? "block" : "none",
        flexShrink: "0",
        width: `${props.width}rem`,
        border: "red solid 1px",
      }}
    />
  );
};
