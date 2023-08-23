import { effect, useSignal } from "@preact/signals-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import * as Components from "@/components";
import * as Constants from "@/constants";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Types from "@/types";
import { NextPageWithLayout } from "./_app";

import Styles from "@/styles/onboarding.module.scss";

const Onboarding: NextPageWithLayout = () => {
  const router = useRouter();

  const { ClientRoutes } = Constants;
  const { currentUser } = useSelector(
    (state: Redux.ReduxStore) => state.entities
  );

  const page = useSignal(1);
  const remainingBudget = useSignal(0);
  const income = useSignal("");
  const savings = useSignal("");
  const recurringPurchases = useSignal<Types.PurchaseModel[]>([]);
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

  function incrementPage(): void {
    if (page.value < 6 && !disabled.value) page.value += 1;
  }

  function nextPage(event: Types.OnSubmit): void {
    event.preventDefault();
    if (page.value < 6) {
      incrementPage();
    } else {
      if (!disabled.value) {
        console.log("Income:", Helpers.numberToCost(Number(income.value)));
        console.log("Savings:", Number(savings.value));
      }
    }
    console.log("Next Page");
  }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.onboarded) router.push(ClientRoutes.LOGBOOKS);
    } else {
      router.push(ClientRoutes.LOGIN);
    }
  }, [currentUser]);

  return (
    <main className={Styles.container}>
      <form
        className={`${Styles.form} ${Helpers.setBackgroundLevel(2)}`}
        onSubmit={nextPage}
      >
        <Components.OnboardingHeader page={page} />

        {page.value > 1 && Number(income.value) >= 0 && (
          <p className={Styles.highlight}>
            ${Helpers.numberToCost(remainingBudget.value)} remaining
          </p>
        )}

        {page.value === 1 ? (
          <Components.OnboardingWelcome />
        ) : page.value === 2 ? (
          <Components.OnboardingIncome income={income} disabled={disabled} />
        ) : page.value === 3 ? (
          <Components.OnboardingSavings
            income={income}
            savings={savings}
            disabled={disabled}
          />
        ) : page.value === 4 ? (
          <Components.OnboardingRecurring purchases={recurringPurchases} />
        ) : page.value === 5 ? (
          <Components.OnboardingIncoming />
        ) : (
          <Components.OnboardingFinal />
        )}

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
