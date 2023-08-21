import * as Components from "@/components";
import * as Types from "@/types";

export const OnboardingWelcome = (props: Types.OnboardingPage) => {
  return (
    <>
      <Components.OnboardingHeader
        title="Hi, and welcome to Kujira!"
        page={props.page}
        decrementPage={props.decrementPage}
      />

      <p>
        This app was created to help you manage your financial health on a
        monthly basis. In order to achieve that, however, you’re going to have
        to fill in some important information in the following steps with as
        much accuracy as possible. Please do not round any values.
      </p>

      <p>
        Rest assured, all information you provide in the next few steps is
        private to you and will never be shared with anyone else. With that
        said, let’s do some setup, starting with your take-home income!
      </p>
    </>
  );
};
