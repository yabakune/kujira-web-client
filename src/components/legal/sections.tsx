import Styles from "./sections.module.scss";
import TextStyles from "@/styles/snippets.module.scss";

import { LegalSection } from "@/types";

const Section = (props: LegalSection) => {
  return (
    <section className={Styles.section}>
      <h3 className={`${Styles.title} ${TextStyles.titleText}`}>
        {props.topic}
      </h3>
      {props.statements.map((statement: string, index: number) => {
        return (
          <p key={`${statement} ${index}`} className={`${Styles.statement}`}>
            {statement}
          </p>
        );
      })}
    </section>
  );
};

type Props = {
  legalSections: LegalSection[];
};

export const Sections = (props: Props) => {
  return (
    <div className={Styles.sections}>
      {props.legalSections.map((section: LegalSection, index: number) => {
        return (
          <Section
            key={`${section.topic} ${index}`}
            topic={section.topic}
            statements={section.statements}
          />
        );
      })}
    </div>
  );
};
