import axios from "axios";
import { useSignal } from "@preact/signals-react";
import { Mulish } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Components from "@/components";
import * as Hooks from "@/hooks";

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
