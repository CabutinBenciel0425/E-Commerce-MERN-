export const recommendations = (arr, count) => {
  const tempArray = [...arr];
  const results = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);

    results.push(tempArray[randomIndex]);
  }

  return [...new Set(results)];
};
