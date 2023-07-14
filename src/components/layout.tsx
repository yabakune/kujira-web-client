import axios from "axios";
import Cookies from "js-cookie";
import { Mulish } from "next/font/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Sagas from "@/sagas";
import { ReduxState } from "@/redux";

import Styles from "./layout.module.scss";
import ThemeStyles from "@/styles/themes.module.scss";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:8000";
}

const userId = Cookies.get("userId");

type Props = { children: React.ReactNode };

const mulish = Mulish({ subsets: ["latin"] });

const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: ReduxState) => state.entities);

  useEffect(() => {
    if (userId && Number(userId) && !currentUser) {
      dispatch(Sagas.fetchUserRequest({ userId: Number(userId) }));
    }

    if (typeof window !== "undefined") {
      if (currentUser) {
        const localStorageTheme = localStorage.getItem("theme");
        if (localStorageTheme) {
          if (localStorageTheme === "light") {
            document
              .getElementsByTagName("body")[0]
              .classList.add(ThemeStyles.lightTheme);
          } else {
            document
              .getElementsByTagName("body")[0]
              .classList.remove(ThemeStyles.darkTheme);
          }
        }

        if (currentUser.theme && localStorageTheme !== currentUser.theme) {
          localStorage.setItem("theme", currentUser.theme);
        }
      }
    }
  }, [dispatch, currentUser]);

  return (
    <div
      className={`
        ${Styles.responsiveSidePadding}
        ${mulish.className}
      `}
    >
      <Components.Notification />

      {props.children}
    </div>
  );
};

export default Layout;
