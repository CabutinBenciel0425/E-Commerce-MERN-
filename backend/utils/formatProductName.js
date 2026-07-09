export const formatProductName = (name) => {
  if (!name) return;
  return name
    .split(" ")
    .map((str) => str.split("").at(0).toUpperCase() + str.slice(1))
    .join(" ");
};
