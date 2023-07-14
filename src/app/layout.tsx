import { Mulish } from "next/font/google";

import "@/styles/globals.scss";
import Styles from "./layout.module.scss";

const mulish = Mulish({ subsets: ["latin"] });

type Props = { children: React.ReactNode };

const RootLayout = (props: Props) => {
  return (
    <html lang="en">
      <body className={`${mulish.className} ${Styles.responsiveSidePadding}`}>
        {props.children}
      </body>
    </html>
  );
};

export default RootLayout;
