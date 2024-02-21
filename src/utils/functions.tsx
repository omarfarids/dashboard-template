export function handleSubscriptionDate(dateString: any, monthsToAdd: any) {
  // Convert the dateString to a Date object
  const date = new Date(dateString);

  // Get the current month and year
  let year = date.getFullYear();
  let month = date.getMonth();

  // Add the months
  month += monthsToAdd;

  // Adjust the year if necessary
  year += Math.floor(month / 12);
  month %= 12;

  // Construct the new date with the adjusted year and month
  const newDate = new Date(
    year,
    month,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

  return newDate.toISOString(); // Convert back to string in ISO format
}

export const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const fileList = e.target.files;
  if (!fileList) return;

  return fileList[0];
};
