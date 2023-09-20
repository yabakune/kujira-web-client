import { Signal, effect, useSignal } from "@preact/signals-react";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Components from "@/components";
import * as Helpers from "@/helpers";
import * as Redux from "@/redux";
import * as Sagas from "@/sagas";
import * as Selectors from "@/selectors";
import * as Types from "@/types";
import { signalsStore } from "@/signals/signals";

import Styles from "./logbook-entry-header.module.scss";
import Snippets from "@/styles/snippets.module.scss";

function determineBudgetHealth(remainingBudget: number): string {
  if (remainingBudget === 0) return Snippets.default;
  else if (remainingBudget <= 0.25) return Snippets.excellent;
  else if (remainingBudget <= 0.5) return Snippets.high;
  else if (remainingBudget <= 0.75) return Snippets.moderate;
  else return Snippets.low;
}

function formatDateName(name: string): string {
  const [month, day, year] = name.split("/");
  return `${Number(month)}/${Number(day)}/${year}`;
}

const { currentLogbookId } = signalsStore;

type Props = {
  entryId: number;
  name: string;
  budget?: number | null;
  totalSpent: number;
  purchaseIds: { id: number }[];
  opened: Signal<boolean>;
  confirmationOpen: Signal<boolean>;
};

export const LogbookEntryHeader = (props: Props) => {
  const dispatch = useDispatch();

  const currentEntry = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntry(state, props.entryId)
  );
  const purchases = useSelector((state: Redux.ReduxStore) =>
    Selectors.fetchEntryPurchases(state, props.purchaseIds)
  );

  const name = useSignal(props.name);
  const budget = useSignal(props.budget ? Helpers.roundCost(props.budget) : "");
  const nameError = useSignal("");
  const budgetError = useSignal("");

  const remainingBudget = useMemo(() => {
    if (props.budget) return props.totalSpent / props.budget;
    else return 0;
  }, [props.totalSpent, props.budget]);

  function toggleOpened(): void {
    props.opened.value = !props.opened.value;
  }

  function openConfirmationModal(
    event: Types.OnClick<HTMLButtonElement>
  ): void {
    event.stopPropagation();
    props.confirmationOpen.value = true;
    props.opened.value = true;
  }

  const updateName = useCallback(
    Helpers.debounce((): void => {
      if (
        currentLogbookId.value &&
        Helpers.userId &&
        Helpers.checkValidLogbookEntryInput(name.value)
      ) {
        dispatch(
          Sagas.updateEntryRequest({
            name: formatDateName(name.value),
            entryId: props.entryId,
            logbookId: currentLogbookId.value,
            userId: Helpers.userId,
            showNotification: true,
          })
        );
        name.value = formatDateName(name.value);
      }
    }, 800),
    []
  );

  const updateBudget = useCallback(
    Helpers.debounce((): void => {
      if (Helpers.userId) {
        dispatch(
          Sagas.updateEntryRequest({
            budget: !Number(budget.value)
              ? null
              : Helpers.roundCostToNumber(Number(budget.value)),
            entryId: props.entryId,
            userId: Helpers.userId,
            showNotification: true,
          })
        );
        if (!Number(budget.value)) budget.value = "";
        else budget.value = Helpers.roundCost(Number(budget.value));
      }
    }, 800),
    []
  );

  const updateTotalSpent = useCallback(
    (
      roundedPurchasesTotalSpent: number,
      roundedNonMonthlyPurchasesTotalSpent: number,
      roundedTotalSpent: number
    ) => {
      if (currentEntry) {
        const totalSpentChanged =
          roundedPurchasesTotalSpent !== roundedTotalSpent;

        const nonMonthlyTotalSpentChanged =
          roundedNonMonthlyPurchasesTotalSpent !==
          Helpers.roundCostToNumber(currentEntry.nonMonthlyTotalSpent);

        if (totalSpentChanged || nonMonthlyTotalSpentChanged) {
          dispatch(
            Sagas.updateEntryRequest({
              totalSpent: roundedPurchasesTotalSpent,
              nonMonthlyTotalSpent: roundedNonMonthlyPurchasesTotalSpent,
              entryId: props.entryId,
              userId: Helpers.userId,
            })
          );
        }
      }
    },
    [purchases, currentEntry]
  );

  effect(() => {
    if (name.value === "") {
      nameError.value = "";
    } else {
      if (!Helpers.checkValidLogbookEntryInput(name.value)) {
        nameError.value = "Invalid date format: MM/DD/YYYY";
      } else {
        nameError.value = "";
      }
    }

    if (budget.value === "") {
      budgetError.value = "";
    } else {
      if (Number(budget.value) !== 0 && !Number(budget.value)) {
        budgetError.value = "Budget must be a number!";
      } else {
        budgetError.value = "";
      }
    }
  });

  useEffect(() => {
    const validName = !nameError.value && name.value !== "";
    const nameChanged = name.value !== props.name;
    if (validName && nameChanged) updateName();
  }, [nameError.value, name.value]);

  useEffect(() => {
    const budgetChanged = Number(budget.value) !== Number(props.budget);
    if (!budgetError.value && budgetChanged) updateBudget();
  }, [budgetError.value, budget.value, props.budget]);

  useEffect(() => {
    if (props.opened.value && currentEntry && purchases && Helpers.userId) {
      let purchasesTotalSpent = 0;
      let nonMonthlyPurchasesTotalSpent = 0;

      if (purchases) {
        for (const purchase of purchases) {
          if (purchase.cost) {
            purchasesTotalSpent += purchase.cost;
            if (
              purchase.category === "need" ||
              purchase.category === "planned" ||
              purchase.category === "impulse" ||
              purchase.category === "regret"
            ) {
              nonMonthlyPurchasesTotalSpent += purchase.cost;
            }
          }
        }
      }

      const roundedPurchasesTotalSpent =
        Helpers.roundCostToNumber(purchasesTotalSpent);

      const roundedNonMonthlyPurchasesTotalSpent = Helpers.roundCostToNumber(
        nonMonthlyPurchasesTotalSpent
      );

      const roundedTotalSpent = Helpers.roundCostToNumber(
        currentEntry.totalSpent
      );

      updateTotalSpent(
        roundedPurchasesTotalSpent,
        roundedNonMonthlyPurchasesTotalSpent,
        roundedTotalSpent
      );
    }
  }, [props.opened.value, currentEntry, purchases]);

  return (
    <header
      className={`
      ${Styles.container}
      ${Helpers.setBackgroundClickHover(2)}
    `}
      onClick={toggleOpened}
    >
      <section className={Styles.headerContent}>
        <div className={Styles.inputs}>
          <Components.Input
            type="text"
            placeholder="MM/DD/YYYY"
            userInput={name}
            errorMessage={nameError}
            icon={<Components.Calendar width={12} fill={8} />}
            onClick={Helpers.preventBubbling}
            required
          />
          <Components.Input
            type="text"
            placeholder="Budget"
            userInput={budget}
            errorMessage={budgetError}
            icon={<Components.Wallet width={12} fill={8} />}
            onClick={Helpers.preventBubbling}
            required
          />
          <article
            className={`
              ${Styles.spent}
              ${Snippets.noInteraction}
            `}
            tabIndex={-1}
          >
            <Components.USD width={12} fill={8} />
            {props.totalSpent ? (
              <span
                className={`
                  ${Styles.totalSpent}
                  ${determineBudgetHealth(remainingBudget)}
                `}
              >
                {Helpers.roundCost(props.totalSpent)}
              </span>
            ) : (
              "Spent"
            )}
          </article>
        </div>
        <Components.ButtonIcon
          onClick={openConfirmationModal}
          backgroundLevel={2}
        >
          <Components.Close width={14} fill={8} />
        </Components.ButtonIcon>
      </section>

      {props.budget && budgetError.value === "" && (
        <section className={Styles.budgetHealth}>
          <p className={Styles.remainingBudget}>
            <span
              className={`
                  ${determineBudgetHealth(remainingBudget)}
                `}
            >
              ${Helpers.formatRoundedCost(props.budget - props.totalSpent)}
            </span>
            {" / "}${Helpers.formatRoundedCost(props.budget)}
          </p>
          <Components.ProgressBar
            progression={remainingBudget * 100}
            reverseProgression
          />
        </section>
      )}
    </header>
  );
};
