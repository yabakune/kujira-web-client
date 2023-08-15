import Styles from "./layout.module.scss";
import ResponsiveStyles from "@/styles/snippets.module.scss";

type Props = { children: React.ReactNode };

const LegalLayout = (props: Props) => {
  return (
    <div
      className={`
      ${Styles.container}
      ${ResponsiveStyles.responsiveSidePaddings}
    `}
    >
      <main className={Styles.main}>{props.children}</main>
    </div>
  );
};

export default LegalLayout;
