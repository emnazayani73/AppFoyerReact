import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Space, message } from "antd";
import axios from "axios";

const EtudiantInvalid = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(null); // ID en cours de validation

  // Charger les étudiants invalides depuis le backend
  useEffect(() => {
    const fetchInvalidEtudiants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/invalides"
        );
        const data = response.data.map((etudiant) => ({
          ...etudiant,
          key: etudiant.id, // Clé unique pour Ant Design
        }));
        setEtudiants(data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des étudiants invalides :",
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInvalidEtudiants();
  }, []);

  // Fonction pour valider un étudiant
  const handleValidate = async (id) => {
    setValidating(id);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/auth/${id}/validate`
      );
      message.success("Étudiant validé avec succès");
      // Mettre à jour l'état local pour retirer l'étudiant validé
      setEtudiants((prev) => prev.filter((etudiant) => etudiant.id !== id));
    } catch (error) {
      console.error("Erreur lors de la validation de l'étudiant :", error);
      const errorMsg = error.response?.data || "Échec de la validation";
      message.error(errorMsg);
    } finally {
      setValidating(null);
    }
  };

  // Colonnes du tableau
  const columns = [
    {
      title: "Matricule",
      dataIndex: "matricule",
      key: "matricule",
    },
    {
      title: "Nom",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      key: "prenom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Statut",
      dataIndex: "isValid",
      key: "isValid",
      render: (isValid) => (
        <Tag color={isValid ? "green" : "red"}>
          {isValid ? "Validé" : "Invalide"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleValidate(record.id)}
            loading={validating === record.id}
            disabled={validating !== null}
            style={{
              backgroundColor: "#4682B4", // Couleur de fond (par exemple, vert)
              color: "#fff",
              variant: "outlined", // Couleur du texte
            }}
          >
            Valider
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={etudiants}
      loading={loading}
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default EtudiantInvalid;
