import * as Types from "@/types";

export function calculatePurchasesTotalCost(
  purchases: Types.PurchaseModel[]
): number {
  let totalCost = 0;
  for (const purchase of purchases) {
    if (purchase.cost) totalCost += purchase.cost;
  }
  return totalCost;
}
