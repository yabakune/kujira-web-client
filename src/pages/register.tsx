import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";

const Register: NextPageWithLayout = () => {
  return <Components.AuthForm type="Register" />;
};

Register.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
