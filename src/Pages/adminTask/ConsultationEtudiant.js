import React from "react";
import TableEtudaints from "../../Components/TableEtudiants";

function ConsultationEtudiant() {
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
        Consultation des étudiants
      </p>
      <TableEtudaints />
    </div>
  );
}

export default ConsultationEtudiant;
