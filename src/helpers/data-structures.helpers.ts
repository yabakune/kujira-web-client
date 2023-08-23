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
