import { insertElementIntoArray } from "./data-structures.helpers";

export function roundCost(cost: number): string {
  return cost.toFixed(2);
}

export function roundCostToNumber(cost: number): number {
  return Number(cost.toFixed(2));
}

export function formatRoundedCost(cost: number): string {
  const roundedCost = cost < 0 ? roundCost(cost * -1) : roundCost(cost);

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

  const formattedRoundedCost = dollars.join("") + `.${cents}`;

  if (cost < 0) return "-" + formattedRoundedCost;
  else return formattedRoundedCost;
}

export function calculateSavedIncome(income: number, savings: number): number {
  return income * (savings / 100);
}
