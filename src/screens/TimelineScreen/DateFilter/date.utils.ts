import { parse } from "date-fns";

export const dateToText = (date: Date) =>
  date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const textToDate = (dateText: string) =>
  parse(dateText!, "MMM d, yyyy", new Date());

export const standardiseDate = (date: Date | number) => {
  const newDate = new Date(date);
  const dateText = dateToText(newDate);
  const standardDate = textToDate(dateText);

  return standardDate;
};
