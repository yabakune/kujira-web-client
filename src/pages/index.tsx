import * as Components from "@/components";

import styles from "@/styles/home.module.scss";

import * as Sagas from "@/redux-saga";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

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
