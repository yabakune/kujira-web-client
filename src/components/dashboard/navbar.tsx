import Image from "next/image";
import { useSignal } from "@preact/signals-react";
import { useRouter } from "next/router";

import * as Components from "@/components";
import * as Constants from "@/constants";
import { signalsStore } from "@/signals/signals";

import Styles from "./navbar.module.scss";
import Snippets from "@/styles/snippets.module.scss";

type Route = Constants.ClientRoutes.LOGBOOKS | Constants.ClientRoutes.SETTINGS;

const { LOGBOOKS, SETTINGS } = Constants.ClientRoutes;

const { currentLogbookId, menuModalOpen } = signalsStore;

export const Navbar = () => {
  const router = useRouter();

  const currentRoute = useSignal<Route>(LOGBOOKS);

  function toggleOverview(): void {
    menuModalOpen.value = true;
  }

  function toPage(route: Route): void {
    currentRoute.value = route;
    router.push(route);
  }

  return (
    <nav className={`${Styles.container} ${Snippets.responsiveSidePadding}`}>
      {currentLogbookId.value && (
        <div className={Styles.overviewToggleButton}>
          <Components.ButtonIcon onClick={toggleOverview}>
            <Components.Overview width={14} fill={8} hoverFill={11} />
          </Components.ButtonIcon>
        </div>
      )}

      <Image
        src="/logo-full-horizontal-violet.svg"
        width={103.65}
        height={20}
        alt="Full Horizontal Logo"
      />

      <section className={Styles.navigationLinks}>
        <Components.ButtonIcon onClick={() => toPage(LOGBOOKS)}>
          <Components.Logbook
            width={14}
            fill={router.pathname === LOGBOOKS ? 11 : 8}
          />
        </Components.ButtonIcon>
        <Components.ButtonIcon onClick={() => toPage(SETTINGS)}>
          <Components.Settings
            width={14}
            fill={router.pathname === SETTINGS ? 11 : 8}
          />
        </Components.ButtonIcon>
      </section>
    </nav>
  );
};
