// this function formate the time from this "2026-03-25T06:12" to "06:12" only
export function formatTime(timeString) {
  if (!timeString) return "";

  const date = new Date(timeString);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
