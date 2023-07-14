import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Legal from "@/components/legal";

export const metadata = Helpers.generateMetadata("Kujira | Cookie Policy");

const CookiePolicy = () => {
  return (
    <>
      <Legal.Header
        title="Kujira Cookie Policy"
        updatedAt="July 1, 2023"
        caption={`This Cookie Policy explains how Kujira ("Company," "we," or "us") uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies as described in this policy.`}
      />
      <Legal.Sections legalSections={Constants.cookiePolicy} />
    </>
  );
};

export default CookiePolicy;
