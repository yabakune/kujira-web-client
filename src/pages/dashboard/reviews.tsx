import * as Components from "@/components";
import { NextPageWithLayout } from "../_app";

const Reviews: NextPageWithLayout = () => {
  return <div>Reviews</div>;
};

Reviews.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.DashboardLayout>{page}</Components.DashboardLayout>;
};

export default Reviews;
