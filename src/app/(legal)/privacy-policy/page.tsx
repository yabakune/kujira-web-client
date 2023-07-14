import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Legal from "@/components/legal";

export const metadata = Helpers.generateMetadata("Kujira | Privacy Policy");

const PrivacyPolicy = () => {
  return (
    <>
      <Legal.Header
        title="Kujira Privacy Policy"
        updatedAt="July 1, 2023"
        caption={`We at Kujira ("Company," "we," or "us") respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this Privacy Policy carefully. By accessing or using our services, you consent to the practices described in this Privacy Policy.`}
      />
      <Legal.Sections legalSections={Constants.privacyPolicy} />
    </>
  );
};

export default PrivacyPolicy;
