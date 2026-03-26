//Date range validation
export function getMaxHistoricalDate() {
  const today = new Date();

  today.setDate(today.getDate() - 1);

  return today.toISOString().split("T")[0];
}

export function getMinHistoricalDate() {
  const date = new Date();

  date.setFullYear(date.getFullYear() - 2);

  return date.toISOString().split("T")[0];
}

export function getDefaultStartDate() {
  const date = new Date();

  date.setDate(date.getDate() - 30);

  return date.toISOString().split("T")[0];
}
