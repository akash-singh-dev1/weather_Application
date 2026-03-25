//util function to convert the temperature.

export const convertTemperature = (value, unit) => {
  if (value == null) return "";

  if (unit === "fahrenheit") {
    return ((value * 9) / 5 + 32).toFixed(1);
  }

  return value.toFixed(1);
};
