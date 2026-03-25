//this function change the time formate from this "2026-03-25T13:30" to "2026-03-25T13:00"
export const resetMinutes = (dateString) => {
  if (!dateString) return "";

  // Takes everything from the start up to the last 2 characters
  // and replaces them with "00"
  return dateString.slice(0, -2) + "00";
};
