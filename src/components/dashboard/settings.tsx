import * as Components from "@/components";

import Styles from "./settings.module.scss";
import { useSignal } from "@preact/signals-react";

const states = ["Account", "Security", "Customization"] as const;
type State = (typeof states)[number];

export const DashboardSettings = () => {
  const currentState = useSignal<State>("Account");

  function setCurrentState(state: State): void {
    currentState.value = state;
  }

  return (
    <div className={Styles.container}>
      <Components.PageSidebar
        title="Settings"
        caption="Navigate your settings below."
      >
        {states.map((state: State) => {
          return (
            <Components.Button
              key={`dashboard-settings-${state}-button`}
              type="button"
              text={state}
              onClick={() => setCurrentState(state)}
              selected={currentState.value === state}
              addClick
            />
          );
        })}
      </Components.PageSidebar>
    </div>
  );
};
