export function numberToCost(number: number): string {
  return number.toFixed(2);
}

export function calculateSavedIncome(income: number, savings: number): number {
  return income * (savings / 100);
}

export function capitalizeFirstCharacter(word: string): string {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
