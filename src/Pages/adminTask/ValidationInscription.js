import React from "react";
import EtudiantInvalid from "../../Components/EtudinatInvalid";

function ValidationInscription() {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: "40px",
          color: "#3271e7",
          fontWeight: "bold",
        }}
      >
        Les Inscription à Valider
      </p>
      <EtudiantInvalid />
    </div>
  );
}

export default ValidationInscription;
