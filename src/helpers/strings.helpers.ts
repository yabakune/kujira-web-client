import { insertElementIntoArray } from "./data-structures.helpers";

export function roundCost(cost: number): string {
  return cost.toFixed(2);
}

export function formatRoundedCost(cost: number): string {
  const roundedCost = roundCost(cost);
  const dollars = roundedCost.split(".")[0].split("");
  const cents = roundedCost.split(".")[1];

  let stepCounter = 0;
  for (let index = dollars.length; index >= 0; index--) {
    stepCounter++;
    if (stepCounter === 4 && index !== 0) {
      insertElementIntoArray(dollars, index, ",");
      stepCounter = 0;
    }
  }

  return dollars.join("") + `.${cents}`;
}

export function calculateSavedIncome(income: number, savings: number): number {
  return income * (savings / 100);
}

export function capitalizeFirstCharacter(word: string): string {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
