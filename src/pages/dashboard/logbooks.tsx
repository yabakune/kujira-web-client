import { ReactElement } from "react";

import * as Components from "@/components";
import { NextPageWithLayout } from "../_app";

const Logbooks: NextPageWithLayout = () => {
  return (
    <>
      <Components.PageHead title="Logbooks" />
      Logbooks
    </>
  );
};

Logbooks.getLayout = function getLayout(page: ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Logbooks;

export async function getServerSideProps() {
  return { props: { requiresAuthorization: true } };
}
