import * as Components from "@/components";
import { NextPageWithLayout } from "./_app";

const Onboarding: NextPageWithLayout = () => {
  return <div>Onboarding</div>;
};

Onboarding.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Onboarding;
