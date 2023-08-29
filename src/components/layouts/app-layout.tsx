import axios from "axios";
import { useSignal } from "@preact/signals-react";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Components from "@/components";
import * as Hooks from "@/hooks";

import ThemeStyles from "@/styles/themes.module.scss";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://localhost:8000";
}

type Props = {
  authenticationRoute: boolean;
  requiresAuthorization: boolean;
  isOnboarding: boolean;
  children: React.ReactNode;
};

const mulish = Mulish({ subsets: ["latin"] });

export const AppLayout = (props: Props) => {
  const router = useRouter();
  const { user, fetchingCurrentUser } = Hooks.useFetchCurrentUser();

  // Required for server-side authorization re-routing to work on the client.
  const mounted = useSignal(false);

  useEffect(() => {
    mounted.value = true;
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  // useEffect(() => {
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
  // }, []);

  return (
    <div className={mulish.className}>
      <Components.Notification />

      {mounted.value &&
        (fetchingCurrentUser ? (
          <Components.Loading text="Fetching your information..." />
        ) : props.requiresAuthorization && !user ? (
          <Components.ToLogin />
        ) : props.requiresAuthorization && !!user && !user.onboarded ? (
          <Components.ToOnboarding />
        ) : props.isOnboarding && !!user && user.onboarded ? (
          <Components.ToLogbooks />
        ) : props.authenticationRoute && !!user && !user.onboarded ? (
          <Components.ToOnboarding />
        ) : props.authenticationRoute && !!user && user.onboarded ? (
          <Components.ToLogbooks />
        ) : (
          props.children
        ))}
    </div>
  );
};
