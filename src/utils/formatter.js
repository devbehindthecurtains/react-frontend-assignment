import { format, isValid, parseISO } from "date-fns";
const DATE_FORMAT = "yyyy-MM-dd";

export const formatter = {
  toLocalizedDate: timestamp => {
    try {
      if (typeof timestamp !== "number") {
        return "";
      }
      const formattedDate = format(timestamp, DATE_FORMAT);
      if (!isValid(parseISO(formattedDate))) {
        return "";
      }
      return formattedDate;
    } catch (error) {
      return "";
    }
  }
};
