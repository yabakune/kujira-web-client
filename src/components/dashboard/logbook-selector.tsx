import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./logbook-selector.module.scss";
import Snippets from "@/styles/snippets.module.scss";

const { currentLogbookId } = signalsStore;

const ExportedComponent = () => {
  const dispatch = useDispatch();
  const { logbooks } = useSelector((state: Redux.ReduxStore) => state.entities);
  const currentUserLogbooks = useSelector(Selectors.fetchCurrentUserLogbooks);

  function createLogbook(): void {
    if (Helpers.userId) {
      dispatch(
        Sagas.createLogbookRequest({
          ownerId: Helpers.userId,
        })
      );
    }
  }

  function selectLogbook(logbookId: number): void {
    currentLogbookId.value = logbookId;
  }

  useEffect(() => {
    if (Helpers.userId && !logbooks) {
      dispatch(
        Sagas.fetchUserLogbooksRequest({
          userId: Helpers.userId,
        })
      );
    }
  }, [logbooks]);

  if (!!logbooks) {
    return (
      <main className={Styles.container}>
        <h1 className={Snippets.titleText}>Select a logbook below.</h1>

        <Components.Button
          text="Create New Logbook"
          onClick={createLogbook}
          centered
          primary
        />

        {currentUserLogbooks &&
          currentUserLogbooks.map((logbook: Types.LogbookModel) => {
            return (
              <Components.Button
                key={logbook.id}
                text={logbook.name}
                onClick={() => selectLogbook(logbook.id)}
              />
            );
          })}
      </main>
    );
  } else {
    return <Components.Loading text="Fetching logbooks..." />;
  }
};

export const LogbookSelector = memo(ExportedComponent);
