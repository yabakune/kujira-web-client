import Link from "next/link";
import { useRouter } from "next/router";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";

import Styles from "./navbar.module.scss";

const links = [
  Constants.ClientRoutes.LOGBOOKS,
  Constants.ClientRoutes.REVIEWS,
  Constants.ClientRoutes.SETTINGS,
];

export const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav className={Styles.nav}>
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
                <Components.Settings
                  width={16}
                  fill={pathname === link ? 11 : 8}
                />
              </Link>
            );
          })}
        </article>
      </section>
    </nav>
  );
};
