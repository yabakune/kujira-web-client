import { signalsStore } from "@/signals/signals";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Constants from "@/constants";
import * as Sagas from "@/sagas";

import { LogbookSelector } from "./logbook-selector";

import Styles from "./logbook-entries.module.scss";

export const LogbookEntries = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;

  useEffect(() => {
    if (selectedLogbookId.value && Constants.userId) {
      dispatch(
        Sagas.fetchLogbookEntriesRequest({
          logbookId: selectedLogbookId.value,
          userId: Constants.userId,
        })
      );
    }
  }, [selectedLogbookId.value]);

  return (
    <section className={Styles.container}>
      {!selectedLogbookId.value ? (
        <LogbookSelector />
      ) : (
        <section className={Styles.logbookEntries}>Logbook Entries</section>
      )}
    </section>
  );
};
