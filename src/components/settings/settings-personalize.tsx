import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Selectors from "@/selectors";

import { ThemeForm } from "./theme-form";

export const SettingsPersonalize = () => {
  console.log("Settings personalize rendered");

  const currentUser = useSelector(Selectors.fetchCurrentUser);

  if (currentUser) {
    return <ThemeForm theme={currentUser.theme} />;
  } else {
    return <Components.Shimmer height="240px" borderRadius={6} />;
  }
};
