import { Mulish } from "next/font/google";

import "@/styles/globals.scss";

const mulish = Mulish({ subsets: ["latin"] });

type Props = { children: React.ReactNode };

const RootLayout = (props: Props) => {
  return (
    <html lang="en">
      <body className={mulish.className}>{props.children}</body>
    </html>
  );
};

export default RootLayout;
