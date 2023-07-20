import { signalsStore } from "@/signals/signals";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Constants from "@/constants";
import * as Saga from "@/sagas";

import { Overview } from "./overview";
import { LogbookEntries } from "./logbook-entries";

import Styles from "./dashboard-logbooks.module.scss";
import { Spacer } from "../spacer";

export const DashboardLogbooks = () => {
  const dispatch = useDispatch();
  const { selectedLogbookId } = signalsStore;

  useEffect(() => {
    if (Constants.userId) {
      dispatch(Saga.fetchUserLogbooksRequest({ userId: Constants.userId }));
    }
  }, []);

  return (
    <div className={Styles.container}>
      <Overview />
      <LogbookEntries />

      <Spacer width={25} show={!!selectedLogbookId.value} />
    </div>
  );
};
