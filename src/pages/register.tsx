import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";

const Register: NextPageWithLayout = () => {
  return <div>Register Page</div>;
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
