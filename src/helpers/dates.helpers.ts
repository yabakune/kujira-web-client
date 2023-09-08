const months: { [key: string]: string } = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export function validateLogbookEntryName(name: string): string {
  // Check to make sure the name fits the MM/DD/YYYY format.
  const regex = new RegExp("^(0[1-9]|1[0-2])/(0[1-9]|1d|2[0-9]|3[0-1])/d{4}$");
  const validUserInput = regex.test(name);

  if (!validUserInput) return "Invalid format.";
  else if (!!new Date(name)) return "Invalid date.";
  else return "";
}

export function formatUserInputToLogbookEntryName(name: string): string {
  const splitName = name.split("/");

  const month = months[Number(splitName[0]) - 1];
  const day = splitName[1];
  const year = splitName[2];

  return `${month} ${day}, ${year}`;
}

export function formatLogbookEntryNameToUserInput(name: string): string {
  const date = new Date(name);

  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();

  if (Number(day) < 10) day = "0" + day;
  if (Number(month) < 10) month = "0" + month;

  return `${month}/${day}/${year}`;
}
