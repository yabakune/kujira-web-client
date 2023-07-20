export function truncateCost(cost: number): number {
  return Number(cost.toFixed(2));
}

export function truncateCostToString(cost: number) {
  if (cost === 0) return "0.00";
  else return cost.toFixed(2);
}
