import { ReactElement } from "react";

import * as Components from "@/components";
import { NextPageWithLayout } from "./_app";

const Register: NextPageWithLayout = () => {
  return (
    <>
      <Components.PageHead title="Register" />

      <main>Registration Page</main>
    </>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return <Components.AuthLayout>{page}</Components.AuthLayout>;
};

export default Register;
