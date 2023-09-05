import { effect, useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Types from "@/types";

import Styles from "@/styles/onboarding.module.scss";

const Onboarding = () => {
  const dispatch = useDispatch();

  const { logbooks, overviews, entries } = useSelector(
    (state: Redux.ReduxStore) => state.entities,
    shallowEqual
  );

  const page = useSignal(1);
  const remainingBudget = useSignal(0);
  const recurringOverviewTotalCost = useSignal(0);
  const income = useSignal("");
  const savings = useSignal("");
  const buttonText = useSignal("Let's go!");
  const disabled = useSignal(true);

  function incrementPage(): void {
    if (!disabled.value && page.value < 6) page.value += 1;
  }

  function completeOnboarding(): void {
    if (!disabled.value && overviews && Helpers.userId) {
      const overviewId = Object.values(overviews)[0].id;
      dispatch(
        Sagas.onboardNewUserRequest({
          income: Number(income.value),
          savings: Number(savings.value),
          overviewId,
          userId: Helpers.userId,
        })
      );
    }
  }

  function nextPage(event: Types.OnSubmit): void {
    event.preventDefault();
    if (page.value < 6) incrementPage();
    else completeOnboarding();
  }

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
      recurringOverviewTotalCost.value;
  });

  useEffect(() => {
    if (Helpers.userId) {
      if (!logbooks) {
        dispatch(Sagas.fetchUserLogbooksRequest({ userId: Helpers.userId }));
      } else if (logbooks) {
        const logbookId = Object.values(logbooks)[0].id;
        dispatch(
          Sagas.fetchLogbookOverviewRequest({
            logbookId,
            userId: Helpers.userId,
          })
        );
      }
    }
  }, [logbooks]);

  useEffect(() => {
    if (overviews && !entries) {
      const overviewId = Object.values(overviews)[0].id;
      dispatch(
        Sagas.fetchOverviewEntriesRequest({
          overviewId,
          userId: Helpers.userId,
        })
      );
    }
  }, [overviews, entries]);

  return (
    <>
      <Components.PageHead title="Onboarding" />

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
            recurringOverviewTotalCost={recurringOverviewTotalCost}
            income={income}
            savings={savings}
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
    </>
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
