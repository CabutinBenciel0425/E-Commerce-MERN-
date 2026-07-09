export const getDateInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
