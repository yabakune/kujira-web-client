import axios from "axios";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Sagas from "@/sagas";
import { ReduxStore } from "@/redux";

import ThemeStyles from "@/styles/themes.module.scss";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:8000";
}

type Props = { children: React.ReactNode };

const mulish = Mulish({ subsets: ["latin"] });

export const AppLayout = (props: Props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: ReduxStore) => state.entities);

  useEffect(() => {
    if (Constants.userId) {
      if (!currentUser) {
        dispatch(Sagas.fetchUserRequest({ userId: Constants.userId }));
      }
    }

    // if (typeof window !== "undefined") {
    //   const localStorageTheme = localStorage.getItem("theme");

    //   if (currentUser.theme && localStorageTheme !== currentUser.theme) {
    //     localStorage.setItem("theme", currentUser.theme);
    //   }

    //   if (currentUser.theme === "dark") {
    //     document.body.classList.remove(ThemeStyles.themeLilac);
    //     document.body.classList.remove(ThemeStyles.systemTheme);
    //   } else if (currentUser.theme === "light") {
    //     document.body.classList.remove(ThemeStyles.systemTheme);
    //     document.body.classList.add(ThemeStyles.themeLilac);
    //   } else if (currentUser.theme === "system") {
    //     document.body.classList.remove(ThemeStyles.themeLilac);
    //     document.body.classList.add(ThemeStyles.systemTheme);
    //   } else {
    //     const date = new Date();
    //     const beforeSixPM = date.getHours() < 18;
    //     if (beforeSixPM) {
    //       document.body.classList.remove(ThemeStyles.systemTheme);
    //       document.body.classList.add(ThemeStyles.themeLilac);
    //     } else {
    //       document.body.classList.remove(ThemeStyles.themeLilac);
    //       document.body.classList.remove(ThemeStyles.systemTheme);
    //     }
    //   }
    // }
  }, []);

  return (
    <div className={mulish.className}>
      <Components.Notification />

      {props.children}
    </div>
  );
};
