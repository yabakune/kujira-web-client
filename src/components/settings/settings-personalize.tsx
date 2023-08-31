import * as Components from "@/components";
import * as Selectors from "@/selectors";

import { ThemeForm } from "./theme-form";
import { useSelector } from "react-redux";

export const SettingsPersonalize = () => {
  const currentUser = useSelector(Selectors.fetchCurrentUser);

  if (currentUser) {
    return <ThemeForm theme={currentUser.theme} />;
  } else {
    return <Components.Shimmer height="240px" borderRadius={6} />;
  }
};
