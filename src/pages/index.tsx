import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Redux from "@/redux";

import styles from "@/styles/home.module.scss";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
      <Components.PageHead title="Home" />

      <main className={styles.main}>
        Home
        <button
          onClick={() =>
            dispatch(
              Redux.entitiesActions.loginUser({
                id: 1,
                email: "john@doe.com",
                username: "johndoe",
                currency: "USD",
                theme: "dark",
                emailVerified: false,
                onboarded: false,
                createdAt: null,
                updatedAt: null,
                overviewIds: [],
                logbookIds: [],
                bugReportIds: [],
              })
            )
          }
        >
          Log In User
        </button>
        <button onClick={() => dispatch(Redux.entitiesActions.logoutUser())}>
          Logout User
        </button>
      </main>
    </>
  );
}
