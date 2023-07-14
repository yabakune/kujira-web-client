import * as Components from "@/components";

import Styles from "./settings.module.scss";
import { useSignal } from "@preact/signals-react";

const states = ["Account", "Security", "Customization"] as const;
type States = (typeof states)[number];

export const DashboardSettings = () => {
  const currentState = useSignal<States>("Account");

  function setCurrentState(state: States): void {
    currentState.value = state;
  }

  return (
    <div className={Styles.container}>
      <Components.PageSidebar
        title="Settings"
        caption="Navigate your settings below."
      >
        {states.map((state: States) => {
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
