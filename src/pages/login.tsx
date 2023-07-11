import * as Components from "@/components";
import { NextPageWithLayout } from "@/pages/_app";

const Login: NextPageWithLayout = () => {
  return <Components.AuthForm type="Log In" />;
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Login;
