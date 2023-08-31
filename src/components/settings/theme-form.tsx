import { useSignal } from "@preact/signals-react";
import { useDispatch } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import { SettingsForm } from "./settings-form";

type Props = {
  theme: Types.Theme;
};

export const ThemeForm = (props: Props) => {
  const dispatch = useDispatch();

  const currentTheme = useSignal(props.theme);

  function setTheme(theme: Types.Theme): void {
    currentTheme.value = theme;
  }

  function updateTheme(): void {
    if (Helpers.userId && currentTheme.value !== props.theme) {
      dispatch(
        Sagas.updateUserRequest({
          theme: currentTheme.value,
          userId: Helpers.userId,
        })
      );
    }
  }

  return (
    <SettingsForm title="Theme" submit={updateTheme}>
      <Components.Button
        leftIcon={
          <Components.ModeViolet
            width={14}
            fill={currentTheme.value === "violet" ? 11 : 8}
          />
        }
        text="Violet"
        onClick={() => setTheme("violet")}
        weakText={currentTheme.value !== "violet"}
        submit
      />

      <Components.Button
        leftIcon={
          <Components.ModeLilac
            width={14}
            fill={currentTheme.value === "lilac" ? 11 : 8}
          />
        }
        text="Lilac"
        onClick={() => setTheme("lilac")}
        weakText={currentTheme.value !== "lilac"}
        submit
      />

      <Components.Button
        leftIcon={
          <Components.ModeSystem
            width={14}
            fill={currentTheme.value === "system" ? 11 : 8}
          />
        }
        text="System"
        onClick={() => setTheme("system")}
        weakText={currentTheme.value !== "system"}
        submit
      />

      <Components.Button
        leftIcon={
          <Components.ModeAuto
            width={14}
            fill={currentTheme.value === "auto" ? 11 : 8}
          />
        }
        text="Auto"
        onClick={() => setTheme("auto")}
        weakText={currentTheme.value !== "auto"}
        submit
      />
    </SettingsForm>
  );
};
