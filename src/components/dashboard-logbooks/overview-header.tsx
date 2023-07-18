import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Sagas from "@/sagas";
import { signalsStore } from "@/signals/signals";

import Styles from "./overview-header.module.scss";
import TextStyles from "@/styles/texts.module.scss";

export const OverviewHeader = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;

  function openLogbookSelector(): void {
    selectedLogbookId.value = null;
  }

  function createLogbookEntry(): void {
    if (selectedLogbookId.value && Constants.userId) {
      const today = new Date();
      const month = today.toLocaleString("default", { month: "long" });
      const day = today.getDate();
      const year = today.getFullYear();

      dispatch(
        Sagas.createEntryRequest({
          name: `${month} ${day}, ${year}`,
          logbookId: selectedLogbookId.value,
          userId: Constants.userId,
        })
      );
    }
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
