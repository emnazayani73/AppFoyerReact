import React from "react";
import TableChambre from "../../Components/TableChambre";

function ModifChambre() {
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
        Les chambres du Foyer
      </p>
      <TableChambre />
    </div>
  );
}

export default ModifChambre;
