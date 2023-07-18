import * as Components from "@/components";

import Styles from "./overview-header.module.scss";
import TextStyles from "@/styles/texts.module.scss";
import { signalsStore } from "@/signals/signals";

export const OverviewHeader = () => {
  const { selectedLogbookId } = signalsStore;

  function openLogbookSelector(): void {
    selectedLogbookId.value = null;
  }

  function createLogbookEntry(): void {
    alert("Create logbook entry");
  }

  return (
    <section className={Styles.container}>
      <header className={Styles.header}>
        <div className={Styles.text}>
          <h1 className={TextStyles.titleText}>Logbooks</h1>
          <p className={Styles.caption}>Date</p>
        </div>

        <Components.ButtonIcon onClick={openLogbookSelector}>
          <Components.Filter width={16} fill={8} hoverFill={11} addHover />
        </Components.ButtonIcon>
      </header>

      <Components.Button
        type="button"
        text={
          selectedLogbookId.value ? "Create Logbook Entry" : "Select a Logbook"
        }
        onClick={createLogbookEntry}
        disabled={!selectedLogbookId.value}
        centerContents
        addClick
        primary
      />
    </section>
  );
};
