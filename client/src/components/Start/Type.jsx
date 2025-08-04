import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Your Smart Companion for Health",
          "सेहत का स्मार्ट साथी",
          "ఆరోగ్యానికి స్మార్ట్ స్నేహితుడు",
          "सेहतसाठी स्मार्ट साथीदार",
          "ಆರೋಗ್ಯದ ಸ್ಮಾರ್ಟ್ ಸಂಗಾತಿ",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
