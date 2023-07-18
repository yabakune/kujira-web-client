import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { SettingsSection } from "./settings-section";

const themes: Types.Theme[] = ["dark", "light", "system", "auto"];

function generateThemeComponent(theme: Types.Theme, selected: boolean) {
  if (theme === "dark") {
    return <Components.ModeDark width={14} fill={selected ? 11 : 8} />;
  } else if (theme === "light") {
    return <Components.ModeLight width={14} fill={selected ? 11 : 8} />;
  } else if (theme === "system") {
    return <Components.ModeSystem width={14} fill={selected ? 11 : 8} />;
  } else {
    return <Components.ModeAuto width={14} fill={selected ? 11 : 8} />;
  }
}

export const SettingsTheme = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: Redux.ReduxState) => state.entities
  );

  function setTheme(theme: Types.Theme): void {
    if (currentUser) {
      dispatch(Sagas.updateUserRequest({ userId: currentUser.id, theme }));
    }
  }

  return (
    <SettingsSection
      key="dashboard-settings-account-customization-theme"
      title="Theme"
    >
      {currentUser &&
        themes.map((theme: Types.Theme, index: number) => {
          return (
            <Components.Button
              key={`dashboard-settings-account-theme-button-${theme}-${index}`}
              type="button"
              text={Helpers.capitalizeFirstCharacter(theme)}
              onClick={() => setTheme(theme)}
              leftIcon={generateThemeComponent(
                theme,
                theme === currentUser.theme
              )}
              borderRadius={10}
              backgroundLevel={3}
              selected={theme === currentUser.theme}
              addClick
            />
          );
        })}
    </SettingsSection>
  );
};
