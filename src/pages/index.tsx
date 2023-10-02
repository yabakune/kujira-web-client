// import { useRouter } from "next/router";
// import { useEffect } from "react";

// import * as Components from "@/components";
// import * as Constants from "@/constants";

// import styles from "@/styles/home.module.scss";

import { ReactElement } from "react";
import * as Components from "@/components";
import Login from "./login";

export default function Home() {
  return <Login />;

  // const router = useRouter();

  // useEffect(() => {
  //   router.replace(Constants.ClientRoutes.LOGIN, undefined, { shallow: true });
  // }, []);

  // return (
  //   <>
  //     <Components.PageHead title="Home" />
  //     {/* <main className={styles.main}>Home</main> */}
  //   </>
  // );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Components.AuthenticationLayout>{page}</Components.AuthenticationLayout>
  );
};

export async function getServerSideProps() {
  return { props: { authenticationRoute: true } };
}
