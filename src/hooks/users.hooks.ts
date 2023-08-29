import axios from "axios";
import useSWR from "swr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";

async function fetchCurrentUser(endpoint: string) {
  const { data } = await axios.get(endpoint);
  return data.response;
}

type CurrentUser = {
  user: Types.UserModel;
  error: any;
  fetchingCurrentUser: boolean;
};

export function useFetchCurrentUser(): CurrentUser {
  if (process.env.NODE_ENV === "development") {
    console.log("useFetchCurrentUser fired");
  }

  const dispatch = useDispatch();

  const endpoint = Helpers.generateGatedEndpoint(
    Constants.APIRoutes.USERS,
    `/${Helpers.userId}`,
    Helpers.userId
  );

  const {
    data: user,
    error,
    isLoading: fetchingCurrentUser,
  } = useSWR(Helpers.userId ? endpoint : null, fetchCurrentUser, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  useEffect(() => {
    if (user) {
      dispatch(Redux.entitiesActions.setCurrentUser(user));
    }
  }, [user]);

  return {
    user,
    error,
    fetchingCurrentUser,
  };
}
