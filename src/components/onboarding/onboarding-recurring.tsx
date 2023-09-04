import { Signal } from "@preact/signals-react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Selectors from "@/selectors";
import { useEffect } from "react";

const copy = (
  <p>
    Many people have expenses that can be calculated and/or grouped into monthly
    segments, such as rent, grocery budget, gas, public transportation, and
    subscription services. If you have any expenses that occur on or can be
    grouped into consistent monthly payments, enter them all below.
  </p>
);

type DropdownProps = {
  entryId: number;
  title: string;
  disabled: Signal<boolean>;
  recurringOverviewTotalCost: Signal<number>;
};

const OverviewPurchasesDropdown = (props: DropdownProps) => {
  const purchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchases(state, props.entryId)
  );

  useEffect(() => {
    if (purchases) {
      props.recurringOverviewTotalCost.value =
        Helpers.calculatePurchasesTotalCost(purchases);
    }
  }, [purchases]);

  return (
    <>
      {copy}
      <Components.OverviewPurchasesDropdown
        entryId={props.entryId}
        title={props.title}
        disabled={props.disabled}
        startOpened={true}
      />
    </>
  );
};

type Props = {
  recurringOverviewTotalCost: Signal<number>;
  disabled: Signal<boolean>;
};

export const OnboardingRecurring = (props: Props) => {
  const recurringOverviewEntry = useSelector(
    Selectors.fetchRecurringOverviewEntry
  );

  if (recurringOverviewEntry) {
    return (
      <OverviewPurchasesDropdown
        entryId={recurringOverviewEntry.id}
        title={recurringOverviewEntry.name}
        disabled={props.disabled}
        recurringOverviewTotalCost={props.recurringOverviewTotalCost}
      />
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
