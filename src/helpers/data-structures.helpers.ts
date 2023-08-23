export function deleteArrayElement<Element>(
  array: Element[],
  index: number
): Element[] {
  const updatedArray = [...array];
  console.log("Updated Array Before:", updatedArray);
  const foo = updatedArray.splice(index, 1);
  console.log("Foo:", foo);
  console.log("Updated Array After:", updatedArray);
  return updatedArray;
}

export function insertElementIntoArray<Element>(
  array: Element[],
  index: number,
  element: Element
): void {
  array.splice(index, 0, element);
}
