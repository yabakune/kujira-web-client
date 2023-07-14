import Link from "next/link";
import { useRouter } from "next/router";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";

import Styles from "./navbar.module.scss";
import ResponsiveStyles from "@/styles/responsives.module.scss";

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
          {links.map((link: Constants.ClientRoutes) => {
            return (
              <Link
                key={`navbar-link-${link}`}
                className={`
								${Styles.linkButton}
								${Helpers.setBackgroundLevel(1, link === pathname)}
								${Helpers.setClickLevel(1)}
								${Helpers.setHoverLevel(1)}
							`}
                href={link}
              >
                {generateLinkComponent(link, link === pathname)}
              </Link>
            );
          })}
        </article>
      </section>
    </nav>
  );
};
