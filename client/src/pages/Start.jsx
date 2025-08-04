import React from "react";
import HeroHome from "../components/Start/HeroHome";
import About from "../components/Start/About";
import FoodAnalyzer from "../components/Start/FoodAnalyzer";

const Start = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {/* Each section should take full viewport height */}
      <section style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <HeroHome />
      </section>

      <section style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <About />
      </section>

      <section style={{ height: "100vh", scrollSnapAlign: "start" }}>
        <FoodAnalyzer />
      </section>
    </div>
  );
};

export default Start;
