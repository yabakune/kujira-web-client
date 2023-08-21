import * as Components from "@/components";
import * as Types from "@/types";

export const OnboardingWelcome = (props: Types.OnboardingPage) => {
  return (
    <Components.OnboardingHeader
      title="Hi, and welcome to Kujira!"
      page={props.page}
      decrementPage={props.decrementPage}
    />
  );
};
