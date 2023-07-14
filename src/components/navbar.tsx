import Link from "next/link";
import { useRouter } from "next/router";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";

import Styles from "./navbar.module.scss";
import ResponsiveStyles from "@/styles/responsive.module.scss";

const links = [
  Constants.ClientRoutes.LOGBOOKS,
  Constants.ClientRoutes.REVIEWS,
  Constants.ClientRoutes.SETTINGS,
];

function generateLinkComponent(
  route: Constants.ClientRoutes,
  selected: boolean
) {
  if (route === Constants.ClientRoutes.LOGBOOKS) {
    return <Components.Logbooks width={16} fill={selected ? 11 : 8} />;
  } else if (route === Constants.ClientRoutes.REVIEWS) {
    return <Components.Reviews width={16} fill={selected ? 11 : 8} />;
  } else {
    return <Components.Settings width={16} fill={selected ? 11 : 8} />;
  }
}

export const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav className={`${Styles.nav} ${ResponsiveStyles.responsiveSidePadding}`}>
      <Components.Logo width={28} />

      <section className={Styles.links}>
        <article className={Styles.dashboardNavigation}>
          {links.map((link: Constants.ClientRoutes, index: number) => {
            return (
              <Link
                key={`navbar-${link}-link-${index}`}
                className={`
								${Styles.linkButton}
								${Helpers.setBackgroundLevel(1, pathname === link)}
								${Helpers.setClickLevel(1)}
								${Helpers.setHoverLevel(1)}
							`}
                href={link}
              >
                {generateLinkComponent(link, pathname === link)}
              </Link>
            );
          })}
        </article>

        <Link
          key="navbar-bug-report-link"
          className={`
								${Styles.linkButton}
								${Helpers.setBackgroundLevel(1, pathname === Constants.ClientRoutes.BUG_REPORT)}
								${Helpers.setClickLevel(1)}
								${Helpers.setHoverLevel(1)}
							`}
          href={Constants.ClientRoutes.BUG_REPORT}
          target="_blank"
        >
          <Components.BugReport
            width={16}
            fill={pathname === Constants.ClientRoutes.BUG_REPORT ? 11 : 8}
          />
        </Link>
      </section>
    </nav>
  );
};
