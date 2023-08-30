import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Selectors from "@/selectors";

import { AccountForm } from "./account-form";
import { SessionForm } from "./session-form";
import { DangerousForm } from "./dangerous-form";

export const SettingsPersonal = () => {
  console.log("Settings personal rendered");

  const currentUser = useSelector(Selectors.fetchCurrentUser);

  if (currentUser) {
    return (
      <>
        <AccountForm
          email={currentUser.email}
          username={currentUser.username}
        />
        <SessionForm />
        <DangerousForm />
      </>
    );
  } else {
    return (
      <>
        <Components.Shimmer height="240px" borderRadius={6} />
        <Components.Shimmer height="113px" borderRadius={6} />
        <Components.Shimmer height="113px" borderRadius={6} />
      </>
    );
  }
};
