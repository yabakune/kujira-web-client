export function deepCopy<Arg>(arg: Arg): Arg {
  return JSON.parse(JSON.stringify(arg));
}

export function removeDuplicatesFromArray<Array>(array: Array[]): Array[] {
  return Array.from(new Set(array));
}

export function sortArray(array: number[]): number[] {
  return array.sort((a: number, b: number) => a - b);
}

export function truncateCost(cost: number) {
  return parseFloat(cost.toFixed(2));
}

export function truncateCostToString(cost: number) {
  if (cost === 0) return "0.00";
  else return parseFloat(cost.toFixed(2)).toString();
}
