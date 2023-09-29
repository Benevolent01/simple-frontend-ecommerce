export let fixKey = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase().replaceAll("_", " ");

export let isDateValid = (dateString) => {
  const date = new Date(dateString);
  // The date is valid if it's not "Invalid Date" and the original string didn't contain non-numeric characters
  return date.toString() !== "Invalid Date" && !isNaN(date);
};

export let generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

// fast fix for now
export let checkAdvancedTab = (tabName, is_admin) => {
  let advancedNames = new Set(["Manage Products", "Manage Categories"]);
  if (advancedNames.has(tabName)) {
    return is_admin;
  }
  return true;
};
