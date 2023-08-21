export function numberToCost(number: number): string {
  return number.toFixed(2);
}

export function calculateSavedIncome(income: number, savings: number): number {
  return income * (savings / 100);
}
