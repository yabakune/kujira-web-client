import * as Components from "@/components";

import styles from "@/styles/home.module.scss";

import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      Redux.uiActions.setNotification({
        body: "fOOOOOOO TEST",
        status: "success",
        timeout: 5000,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Components.PageHead title="Home" />

      <main className={styles.main}>
        Home
        <br />
        <br />
        <button
          type="button"
          onClick={() =>
            dispatch(Sagas.logoutRequest({ email: "kujira.help@outlook.com" }))
          }
        >
          Log Out
        </button>
      </main>
    </>
  );
}
