import axios from "axios";
import Cookies from "js-cookie";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Sagas from "@/sagas";
import { ReduxState } from "@/redux";

import ThemeStyles from "@/styles/themes.module.scss";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:8000";
}

const userId = Cookies.get("userId");

type Props = { children: React.ReactNode };

const mulish = Mulish({ subsets: ["latin"] });

const gatedRoutes: string[] = [
  Constants.ClientRoutes.LOGBOOKS,
  Constants.ClientRoutes.REVIEWS,
  Constants.ClientRoutes.SETTINGS,
  Constants.ClientRoutes.BUG_REPORT,
];

const ungatedRoutes: string[] = [
  Constants.ClientRoutes.LANDING,
  Constants.ClientRoutes.REGISTER,
  Constants.ClientRoutes.LOGIN,
];

const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: ReduxState) => state.entities);

  useEffect(() => {
    if (userId && Number(userId) && !currentUser) {
      dispatch(Sagas.fetchUserRequest({ userId: Number(userId) }));
    } else if (!currentUser) {
      if (gatedRoutes.includes(router.pathname)) {
        router.push(Constants.ClientRoutes.LANDING);
      }
    } else {
      if (ungatedRoutes.includes(router.pathname)) {
        router.push(Constants.ClientRoutes.LOGBOOKS);
      }

      if (typeof window !== "undefined") {
        const localStorageTheme = localStorage.getItem("theme");

        if (currentUser.theme && localStorageTheme !== currentUser.theme) {
          localStorage.setItem("theme", currentUser.theme);
        }

        if (currentUser.theme === "dark") {
          document.body.classList.remove(ThemeStyles.lightTheme);
          document.body.classList.remove(ThemeStyles.systemTheme);
        } else if (currentUser.theme === "light") {
          document.body.classList.remove(ThemeStyles.systemTheme);
          document.body.classList.add(ThemeStyles.lightTheme);
        } else if (currentUser.theme === "system") {
          document.body.classList.remove(ThemeStyles.lightTheme);
          document.body.classList.add(ThemeStyles.systemTheme);
        } else {
          const date = new Date();
          const beforeSixPM = date.getHours() < 18;
          if (beforeSixPM) {
            document.body.classList.remove(ThemeStyles.systemTheme);
            document.body.classList.add(ThemeStyles.lightTheme);
          } else {
            document.body.classList.remove(ThemeStyles.lightTheme);
            document.body.classList.remove(ThemeStyles.systemTheme);
          }
        }
      }
    }
  }, [currentUser]);

  return (
    <div className={mulish.className}>
      <Components.Notification />

      {props.children}
    </div>
  );
};

export default Layout;
