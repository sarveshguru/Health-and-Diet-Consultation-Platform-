import React, { useRef } from "react";
import background from "../../assets/images/background.png"; // Adjust path as needed

const FoodAnalyzer = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // You can add image analysis logic here
    }
  };

  const containerStyle = {
    scrollSnapAlign: "start",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  };

  const subheadingStyle = {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ffffffcc",
    color: "#333",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Know What’s on Your Plate</h1>
      <p style={subheadingStyle}>Click. Count. Control.</p>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Visible Upload Button */}
      <button style={buttonStyle} onClick={handleButtonClick}>
        Try it Now
      </button>
    </div>
  );
};

export default FoodAnalyzer;
