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

Logbooks.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Logbooks;
