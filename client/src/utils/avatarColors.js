const charColors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#3F51B5",
  "#2196F3",
  "#009688",
  "#4CAF50",
  "#FF9800",
  "#795548",
  "#607D8B",
];

export const getColorForChar = (char) => {
  if (!char) return "#ccc";
  const code = char.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return charColors[(code - 65) % charColors.length];
  }
  return "#ccc";
};
