import { Signal } from "@preact/signals-react";
import { memo } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Selectors from "@/selectors";

const copy = (
  <p>
    Are you aware of any incoming purchases that will eventually come down your
    way but are not sure when you have to pay for them? Or do you have any
    payments in general that you want to jot down for later? If so, enter them
    all below.
  </p>
);

type Props = {
  disabled: Signal<boolean>;
};

const ExportedComponent = (props: Props) => {
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

export const OnboardingIncoming = memo(ExportedComponent);
