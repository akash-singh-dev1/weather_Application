//functions to get today date and get minimum(-7) and maximum(+7) date
export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function getMinDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  return date.toISOString().split("T")[0];
}

export function getMaxDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  return date.toISOString().split("T")[0];
}
