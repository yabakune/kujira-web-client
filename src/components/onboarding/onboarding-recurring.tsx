import * as Components from "@/components";
import * as Types from "@/types";

type Props = {
  purchases: Types.PurchaseModel[];
};

export const OnboardingRecurring = (props: Props) => {
  return (
    <>
      <p>
        Many people have expenses that can be calculated and/or grouped into
        monthly segments, such as rent, grocery budget, gas, public
        transportation, and subscription services. If you have any expenses that
        occur on or can be grouped into consistent monthly payments, enter them
        all below.
      </p>

      <Components.OverviewPurchasesDropdown
        title="Recurring Purchases"
        purchases={props.purchases}
        addPurchase={() => console.log("Add Purchase Baby")}
        startOpened
      />
    </>
  );
};
