export let fixKey = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase().replaceAll("_", " ");

export let isDateValid = (dateString) => {
  const date = new Date(dateString);
  // The date is valid if it's not "Invalid Date" and the original string didn't contain non-numeric characters
  return date.toString() !== "Invalid Date" && !isNaN(date);
};
