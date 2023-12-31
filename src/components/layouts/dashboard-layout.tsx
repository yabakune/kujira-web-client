import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Selectors from "@/selectors";
import { signalsStore } from "@/signals/signals";

import { LogbookSelector } from "../dashboard/logbook-selector";
import { Navbar } from "../dashboard/navbar";
import { Overview } from "../overview/overview";

import Styles from "./dashboard-layout.module.scss";
import Snippets from "@/styles/snippets.module.scss";
import ThemeStyles from "@/styles/themes.module.scss";

type Props = {
  children: React.ReactNode;
};

const { currentLogbookId } = signalsStore;

export const DashboardLayout = (props: Props) => {
  const currentUser = useSelector(Selectors.fetchCurrentUser);

  useEffect(() => {
    if (typeof window !== "undefined" && !!currentUser) {
      if (currentUser.theme === "violet") {
        document.body.classList.remove(ThemeStyles.themeLilac);
        document.body.classList.remove(ThemeStyles.systemTheme);
        document.body.classList.add(ThemeStyles.themeViolet);
      } else if (currentUser.theme === "lilac") {
        document.body.classList.remove(ThemeStyles.themeViolet);
        document.body.classList.remove(ThemeStyles.systemTheme);
        document.body.classList.add(ThemeStyles.themeLilac);
      } else if (currentUser.theme === "system") {
        document.body.classList.remove(ThemeStyles.themeViolet);
        document.body.classList.remove(ThemeStyles.themeLilac);
        document.body.classList.add(ThemeStyles.systemTheme);
      } else {
        const date = new Date();
        const beforeSixPM = date.getHours() < 18;
        if (beforeSixPM) {
          document.body.classList.remove(ThemeStyles.themeViolet);
          document.body.classList.remove(ThemeStyles.systemTheme);
          document.body.classList.add(ThemeStyles.themeLilac);
        } else {
          document.body.classList.remove(ThemeStyles.themeLilac);
          document.body.classList.remove(ThemeStyles.systemTheme);
          document.body.classList.add(ThemeStyles.themeViolet);
        }
      }
    }
  }, [currentUser]);

  return (
    <div className={Styles.container}>
      <Components.MenuModal
        extraOpenConditional={!!currentLogbookId.value}
        title="Logbook Overview"
        fillContent
      >
        <Overview />
      </Components.MenuModal>

      <Navbar />

      <div className={Styles.body}>
        <div
          className={`${Styles.scrollContainer} ${Snippets.responsiveSidePadding}`}
        >
          {!currentLogbookId.value ? (
            <>
              <Components.PageHead title="Select a Logbook" />
              <LogbookSelector />
            </>
          ) : (
            <>
              <section className={Styles.overview}>
                <Overview />
              </section>

              <article className={Styles.mainContent}>{props.children}</article>

              <div className={Styles.overviewSpacer} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
