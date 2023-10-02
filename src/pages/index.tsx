import { useRouter } from "next/router";
import { useEffect } from "react";

import * as Components from "@/components";
import * as Constants from "@/constants";

import styles from "@/styles/home.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(Constants.ClientRoutes.LOGIN, undefined, { shallow: true });
  }, []);

  return (
    <>
      <Components.PageHead title="Home" />
      {/* <main className={styles.main}>Home</main> */}
    </>
  );
}
