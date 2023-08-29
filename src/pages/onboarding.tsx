import { effect, useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import Styles from "@/styles/onboarding.module.scss";

function generatePurchasesForAPI(
  purchases: Types.PurchaseModel[],
  entryId: number
) {
  return purchases.map((purchase: Types.PurchaseModel) => {
    const { placement, category, description, cost } = purchase;
    return { placement, category, description, cost: cost || null, entryId };
  });
}

function findEntryId(
  name: "Recurring" | "Incoming",
  entries: Types.NormalizedEntries
) {
  for (const entry of Object.values(entries)) {
    if (entry.name === name) return entry.id;
  }
}

const Onboarding = () => {
  const dispatch = useDispatch();

  const { logbooks, overviews, entries } = useSelector(
    (state: Redux.ReduxStore) => state.entities,
    shallowEqual
  );

  const page = useSignal(1);
  const remainingBudget = useSignal(0);
  const income = useSignal("");
  const savings = useSignal("");
  const recurringPurchases = useSignal<Types.PurchaseModel[]>([
    {
      id: 1,
      placement: 1,
      category: "monthly",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      entryId: 1,
    },
  ]);
  const incomingPurchases = useSignal<Types.PurchaseModel[]>([
    {
      id: 1,
      placement: 1,
      category: "monthly",
      description: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      entryId: 1,
    },
  ]);
  const buttonText = useSignal("Let's go!");
  const disabled = useSignal(true);

  effect(() => {
    if (page.value === 1) {
      buttonText.value = "Let's go!";
      disabled.value = false;
    } else if (page.value === 2) {
      buttonText.value = "Savings";
    } else if (page.value === 3) {
      buttonText.value = "Recurring Purchases";
    } else if (page.value === 4) {
      buttonText.value = "Incoming Purchases";
    } else if (page.value === 5) {
      buttonText.value = "Final Step";
      disabled.value = false;
    } else {
      buttonText.value = "I'm ready.";
      disabled.value = false;
    }

    remainingBudget.value =
      Number(income.value) -
      Helpers.calculateSavedIncome(
        Number(income.value),
        Number(savings.value)
      ) -
      Helpers.calculatePurchasesTotalCost(recurringPurchases.value);
  });

  useEffect(() => {
    if (!logbooks && Helpers.userId) {
      dispatch(Sagas.fetchUserLogbooksRequest({ userId: Helpers.userId }));
    } else if (logbooks) {
      const logbook = Object.values(logbooks)[0];
      dispatch(
        Sagas.fetchLogbookOverviewRequest({
          logbookId: logbook.id,
          userId: Helpers.userId,
        })
      );
    }
  }, [logbooks]);

  useEffect(() => {
    if (overviews) {
      const overview = Object.values(overviews)[0];
      dispatch(
        Sagas.fetchOverviewEntriesRequest({
          overviewId: overview.id,
          userId: Helpers.userId,
        })
      );
    }
  }, [overviews]);

  function incrementPage(): void {
    if (page.value < 6 && !disabled.value) page.value += 1;
  }

  function completeOnboarding(): void {
    if (!disabled.value && Helpers.userId && logbooks && entries) {
      const logbookId = Object.values(logbooks)[0].id;
      const recurringEntryId = findEntryId("Recurring", entries);
      const incomingEntryId = findEntryId("Incoming", entries);

      if (recurringEntryId && incomingEntryId) {
        dispatch(
          Sagas.onboardNewUserRequest({
            userId: Helpers.userId,
            logbookId,
            income: Number(income.value),
            savings: Number(savings.value),
            recurringPurchases: generatePurchasesForAPI(
              recurringPurchases.value,
              recurringEntryId
            ),
            incomingPurchases: generatePurchasesForAPI(
              incomingPurchases.value,
              incomingEntryId
            ),
            recurringEntry: {
              id: recurringEntryId,
              totalCost: Helpers.calculatePurchasesTotalCost(
                recurringPurchases.value
              ),
            },
            incomingEntry: {
              id: incomingEntryId,
              totalCost: Helpers.calculatePurchasesTotalCost(
                incomingPurchases.value
              ),
            },
          })
        );
      }
    }
  }

  function nextPage(event: Types.OnSubmit): void {
    event.preventDefault();
    if (page.value < 6) {
      incrementPage();
    } else {
      completeOnboarding();
    }
  }

  return (
    <main className={Styles.container}>
      <form
        className={`${Styles.form} ${Helpers.setBackgroundLevel(2)}`}
        onSubmit={nextPage}
      >
        <Components.OnboardingHeader page={page} />

        {page.value > 1 && Number(income.value) >= 0 && (
          <p className={Styles.highlight}>
            ${Helpers.formatRoundedCost(remainingBudget.value)} remaining
          </p>
        )}

        <Components.OnboardingPages
          page={page}
          income={income}
          savings={savings}
          recurringPurchases={recurringPurchases}
          incomingPurchases={incomingPurchases}
          disabled={disabled}
        />

        <Components.Button
          text={buttonText.value}
          rightIcon={<Components.ArrowRight width={14} fill={12} />}
          disabled={disabled}
          centered
          primary
          submit
        />
      </form>
    </main>
  );
};

export default Onboarding;

export async function getServerSideProps() {
  return {
    props: {
      requiresAuthorization: true,
      isOnboarding: true,
    },
  };
}
