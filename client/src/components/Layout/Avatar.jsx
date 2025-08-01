import React from "react";

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

function getColorForChar(char) {
  if (!char) return "#ccc";
  const code = char.toUpperCase().charCodeAt(0);
  // Map A-Z to 0-9
  if (code >= 65 && code <= 90) {
    return charColors[(code - 65) % charColors.length];
  }
  // For other chars, pick a default
  return "#ccc";
}

const Avatar = ({
  children,
  backgroundColor,
  py,
  px,
  pz,
  color,
  borderRadius,
  fontSize,
  cursor,
}) => {
  // Use the first character for color mapping
  const char = typeof children === "string" ? children.trim()[0] : "";
  const bgColor = backgroundColor || getColorForChar(char);

  const style = {
    backgroundColor: bgColor,
    boxSizing: "border-box",
    padding: `${py} ${px}`,
    width: `${pz}`,
    height: `${pz}`,
    color: color || "white",
    borderRadius,
    fontSize,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: cursor || null,
  };

  return <div style={style}>{children}</div>;
};

export default Avatar;
