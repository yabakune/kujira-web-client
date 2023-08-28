import * as Components from "@/components";

import styles from "@/styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Components.PageHead title="Home" />

      <Components.AuthorizationLayout>
        <main className={styles.main}>Home</main>
      </Components.AuthorizationLayout>
    </>
  );
}
