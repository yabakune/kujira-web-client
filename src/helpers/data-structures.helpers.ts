export function deleteArrayElement<Element>(
  array: Element[],
  index: number
): Element[] {
  const updatedArray = [...array];
  updatedArray.splice(index, 1);
  return updatedArray;
}

export function insertElementIntoArray<Element>(
  array: Element[],
  index: number,
  element: Element
): void {
  array.splice(index, 0, element);
}

export function removeDuplicatesFromArray<Array>(array: Array[]): Array[] {
  return Array.from(new Set(array));
}

export function sortArray(array: number[]): number[] {
  return array.sort((a: number, b: number) => a - b);
}
