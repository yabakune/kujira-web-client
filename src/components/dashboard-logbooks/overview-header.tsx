import * as Components from "@/components";

import Styles from "./overview-header.module.scss";
import TextStyles from "@/styles/texts.module.scss";

export const OverviewHeader = () => {
  function createLogbookEntry(): void {
    alert("Create logbook entry");
  }

  return (
    <section className={Styles.container}>
      <header className={Styles.header}>
        <h1 className={TextStyles.titleText}>Logbooks</h1>
        <p className={Styles.caption}>Date</p>
      </header>

      <Components.Button
        type="button"
        text="Create Logbook Entry"
        onClick={createLogbookEntry}
        centerContents
        addClick
        primary
      />
    </section>
  );
};
