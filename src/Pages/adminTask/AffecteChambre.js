import React from "react";
import ChambresLibres from "../../Components/ChambresLibres";

function AffecteChambre() {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: "32px",
          color: "#3271e7",
          fontWeight: "bold",
        }}
      >
        Affectation des Chambres
      </p>
      <ChambresLibres />
    </div>
  );
}

export default AffecteChambre;
