export function getAQILabel(value) {
  if (value < 0) return "wrong input Aqi can't be negative";
  if (value <= 20) return "Good";
  if (value <= 40) return "fair";
  if (value <= 60) return "moderate";
  if (value <= 80) return "Poor";
  if (value <= 100) return "very Poor";

  return "Extremely Poor";
}
