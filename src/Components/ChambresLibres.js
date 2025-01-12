import React, { useEffect, useState } from "react";
import { Table, Tag, Select, Button, message } from "antd";
import axios from "axios";

const ChambresLibres = () => {
  const [chambres, setChambres] = useState([]);
  const [etudiantsSansChambre, setEtudiantsSansChambre] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEtudiants, setSelectedEtudiants] = useState({}); // Stocke l'étudiant sélectionné pour chaque chambre

  // Charger les données des chambres libres
  useEffect(() => {
    const fetchChambresLibres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/chambres/status/libre"
        );
        const data = response.data.map((chambre) => ({
          ...chambre,
          key: chambre.id, // Ajouter une clé unique pour le tableau
        }));
        setChambres(data);
      } catch (error) {
        console.error("Erreur lors du chargement des chambres libres :", error);
        message.error("Impossible de charger les chambres libres");
      }
    };

    const fetchEtudiantsSansChambre = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/etudiants/sans-chambre"
        );
        const data = response.data.map((etudiant) => ({
          id: etudiant.id,
          nomComplet: `${etudiant.nom} ${etudiant.prenom}`,
        }));
        setEtudiantsSansChambre(data);
      } catch (error) {
        console.error("Erreur lors du chargement des étudiants :", error);
        message.error("Impossible de charger les étudiants non affectés");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchChambresLibres(), fetchEtudiantsSansChambre()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Fonction pour affecter une chambre à un étudiant
  const assignChambre = async (etudiantId, chambreId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/chambres/${etudiantId}/assign-chambre/${chambreId}`
      );
      message.success(response.data);

      // Actualiser les données
      const fetchData = async () => {
        const chambresResponse = await axios.get(
          "http://localhost:8080/api/chambres/status/libre"
        );
        const etudiantsResponse = await axios.get(
          "http://localhost:8080/api/auth/etudiants/sans-chambre"
        );

        setChambres(
          chambresResponse.data.map((chambre) => ({
            ...chambre,
            key: chambre.id,
          }))
        );

        setEtudiantsSansChambre(
          etudiantsResponse.data.map((etudiant) => ({
            id: etudiant.id,
            nomComplet: `${etudiant.nom} ${etudiant.prenom}`,
          }))
        );
      };

      await fetchData();
    } catch (error) {
      console.error("Erreur lors de l'affectation :", error);
      message.error("Échec de l'affectation");
    }
  };

  // Colonnes pour le tableau
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Prix",
      dataIndex: "prix",
      key: "prix",
      render: (prix) => `${prix} TND`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: "Capacité",
      dataIndex: "capacite",
      key: "capacite",
    },
    {
      title: "Places Occupées",
      dataIndex: "placeDejaOccupe",
      key: "placeDejaOccupe",
      render: (placeDejaOccupe) => placeDejaOccupe ?? 0,
    },
    {
      title: "Statut",
      dataIndex: "statut",
      key: "statut",
      render: (statut) => <Tag color="green">{statut}</Tag>,
    },
    {
      title: "Étudiants non affectés",
      key: "etudiantsNonAffectes",
      render: (_, record) => (
        <Select
          placeholder="Sélectionnez un étudiant"
          style={{ width: "100%" }}
          onChange={(value) => {
            setSelectedEtudiants((prev) => ({ ...prev, [record.id]: value }));
          }}
        >
          {etudiantsSansChambre.map((etudiant) => (
            <Select.Option key={etudiant.id} value={etudiant.id}>
              {etudiant.nomComplet}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          disabled={!selectedEtudiants[record.id]} // Désactiver si aucun étudiant n'est sélectionné
          onClick={() => assignChambre(selectedEtudiants[record.id], record.id)}
        >
          Affecter
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={chambres}
      loading={loading}
      pagination={{ pageSize: 5 }}
      bordered
    />
  );
};

export default ChambresLibres;
