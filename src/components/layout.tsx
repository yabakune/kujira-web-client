import axios from "axios";
import Cookies from "js-cookie";
import { Mulish } from "next/font/google";

import * as Components from "@/components";

import Styles from "./layout.module.scss";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = "https://production-endpoint";
}

const userId = Cookies.get("userId");

type Props = { children: React.ReactNode };

const mulish = Mulish({ subsets: ["latin"] });

const Layout = (props: Props) => {
  return (
    <div className={`${Styles.responsiveSidePadding} ${mulish.className}`}>
      <Components.Notification />

      {props.children}
    </div>
  );
};

export default Layout;
