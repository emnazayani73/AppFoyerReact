import React from "react";
import TableUser from "../../Components/TableUser";

function GereRole() {
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
        Gestion des rôles
      </p>
      <TableUser />
    </div>
  );
}

export default GereRole;
