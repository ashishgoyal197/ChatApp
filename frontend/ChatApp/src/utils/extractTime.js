export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

export function formatLastSeen(dateString) {
  if (!dateString) {
    return "Offline";
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Offline";
  }
  return `Last seen ${date.toLocaleDateString()} ${extractTime(dateString)}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
