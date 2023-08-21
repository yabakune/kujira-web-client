import { effect, useSignal } from "@preact/signals-react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
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
  const buttonText = useSignal("Let's go!");

  effect(() => {
    if (page.value === 1) {
      buttonText.value = "Let's go!";
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
    }
  });

  function incrementPage(): void {
    if (page.value < 6) page.value += 1;
  }

  const decrementPage = useCallback(() => {
    if (page.value > 1) page.value -= 1;
  }, []);

  function nextPage(event: Types.OnSubmit): void {
    event.preventDefault();
    if (page.value < 6) {
      incrementPage();
    } else {
      console.log("Foo");
    }
    console.log("Next Page");
  }

  console.log("Page:", page.value);

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
        {page.value === 1 ? (
          <Components.OnboardingWelcome
            page={page}
            decrementPage={decrementPage}
          />
        ) : (
          <></>
        )}

        <Components.Button
          text={buttonText.value}
          rightIcon={<Components.ArrowRight width={14} fill={12} />}
          centered
          primary
          submit
        />
      </form>
    </main>
  );
};

export default Onboarding;