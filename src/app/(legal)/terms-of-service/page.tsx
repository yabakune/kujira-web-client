import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Legal from "@/components/legal";

export const metadata = Helpers.generateMetadata("Kujira | Terms Of Service");

const TermsOfService = () => {
  return (
    <>
      <Legal.Header
        title="Kujira Terms Of Service"
        updatedAt="July 1, 2023"
        caption={`Please read these Terms of Service ("Terms") carefully before using our services.`}
      />
      <Legal.Sections legalSections={Constants.termsOfService} />
    </>
  );
};

export default TermsOfService;
