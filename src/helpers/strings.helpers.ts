export function roundCost(cost: number): string {
  return cost.toFixed(2);
}

export function calculateSavedIncome(income: number, savings: number): number {
  return income * (savings / 100);
}

export function capitalizeFirstCharacter(word: string): string {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
