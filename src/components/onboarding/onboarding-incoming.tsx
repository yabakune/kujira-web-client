import { Signal } from "@preact/signals-react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Selectors from "@/selectors";

type Props = {
  disabled: Signal<boolean>;
};

const copy = (
  <p>
    Are you aware of any incoming purchases that will eventually come down your
    way but are not sure when you have to pay for them? Or do you have any
    payments in general that you want to jot down for later? If so, enter them
    all below.
  </p>
);

export const OnboardingIncoming = (props: Props) => {
  const incomingOverviewEntry = useSelector(
    Selectors.fetchIncomingOverviewEntry
  );

  if (incomingOverviewEntry) {
    return (
      <>
        {copy}
        <Components.OverviewPurchasesDropdown
          entryId={incomingOverviewEntry.id}
          title={incomingOverviewEntry.name}
          disabled={props.disabled}
          startOpened={true}
        />
      </>
    );
  } else {
    return (
      <>
        {copy}
        <Components.Shimmer height="86px" borderRadius={6} />
      </>
    );
  }
};
