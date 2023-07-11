import { Mulish } from "next/font/google";

import Styles from "./layout.module.scss";

type Props = { children: React.ReactNode };

const mulish = Mulish({ subsets: ["latin"] });

const Layout = (props: Props) => {
  return (
    <div className={`${Styles.responsiveSidePadding} ${mulish.className}`}>
      {props.children}
    </div>
  );
};

export default Layout;
