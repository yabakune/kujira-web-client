import axios from "axios";
import { Mulish } from "next/font/google";

import Styles from "./layout.module.scss";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
} else if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = "https://production-endpoint";
}

// const userId = Cookies.get("id");
// const jwtAccessToken = Cookies.get("token");
// if (jwtAccessToken) {
//   axios.defaults.headers.common["Authorization"] = jwtAccessToken;
// }

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
